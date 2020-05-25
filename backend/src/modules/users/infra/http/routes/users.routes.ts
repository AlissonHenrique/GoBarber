import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/createUserService';
import UpdateUserAvatarService from '@modules/users/services/updateUserAvatarService';
import midlewareAuthenticate from '../midlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({ name, email, password });

  delete user.password; // não exibe o password ao listar

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  midlewareAuthenticate,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarfileName: request.file.filename,
    });
    delete user.password;
    return response.json(user);
  },
);
export default usersRouter;
