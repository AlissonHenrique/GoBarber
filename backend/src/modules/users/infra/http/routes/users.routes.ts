import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';
import midlewareAuthenticate from '../midlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersControllers';
import UserAavatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const userController = new UsersController();
const userAavatarController = new UserAavatarController();

usersRouter.post('/', userController.create);

usersRouter.patch(
  '/avatar',
  midlewareAuthenticate,
  upload.single('avatar'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userAavatarController.update,
);
export default usersRouter;
