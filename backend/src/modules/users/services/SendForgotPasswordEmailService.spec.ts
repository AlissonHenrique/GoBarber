import 'reflect-metadata';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });
  it('shold be able to recover the password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUserRepository.create({
      name: ' João',
      email: 'joao@gmail.com',
      password: '22222',
    });
    await sendForgotPasswordEmail.execute({
      email: 'joao@gmail.com',
    });
    await expect(sendMail).toHaveBeenCalled();
  });

  it('shold not able to recoverer a non exist user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'joao@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');
    const user = await fakeUserRepository.create({
      name: ' João',
      email: 'joao@gmail.com',
      password: '22222',
    });
    await sendForgotPasswordEmail.execute({
      email: 'joao@gmail.com',
    });

    await expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
