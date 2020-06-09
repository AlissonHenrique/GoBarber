///REGRAS DE NEGOCIO DA APLICAÇÃO

//import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/erros/AppError';

import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}
  public async execute({ email }: Request): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(email);
    if (!userExists) throw new AppError('User does not exist');

    await this.userTokenRepository.generate(userExists.id);

    this.mailProvider.sendMail(email, 'Pedido de email');
  }
}

export default SendForgotPasswordEmailService;
