import { Router } from 'express';
import CreateUserService from '../services/createUserService';
const usersRouter = Router();
import midlewareAuthenticate from '../midlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/updateUserAvatarService';
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
