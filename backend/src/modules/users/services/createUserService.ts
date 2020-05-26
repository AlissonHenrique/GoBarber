///REGRAS DE NEGOCIO DA APLICAÇÃO

import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address used');
    }
    const hashPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateUserService;
