import 'reflect-metadata';
import ResetPasswordService from './ResetPasswordService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/erros/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    fakeUserTokenRepository = new FakeUserTokenRepository();
    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });
  it('shold be able to reset password', async () => {
    const user = await fakeUserRepository.create({
      name: ' Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const generateHash = await jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123123',
      token: token,
    });

    const updateUser = await fakeUserRepository.findById(user.id);
    await expect(generateHash).toHaveBeenCalledWith('123123');
    await expect(updateUser?.password).toBe('123123');
  });

  it('shold not be able to reset the password non-exist token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-exist',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to reset the password non-exist user', async () => {
    const { token } = await fakeUserTokenRepository.generate('non-exist');

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: ' Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '123123',
        token: token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
