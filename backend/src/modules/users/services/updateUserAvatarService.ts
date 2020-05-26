import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
interface Request {
  user_id: string;
  avatarfileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarfileName }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Only authorized user can changes avatar', 401);
    }
    if (user.avatar) {
      // deleta avatar anterior
      const userAvatarFildPath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFildPath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFildPath);
      }
    }
    user.avatar = avatarfileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
