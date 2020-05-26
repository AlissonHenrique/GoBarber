import { Router } from 'express';
import multer from 'multer';

import midlewareAuthenticate from '../midlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe';

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
  userAavatarController.update,
);
export default usersRouter;
