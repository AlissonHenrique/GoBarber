import 'reflect-metadata';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './authenticateUserService';
import CreateUserService from './createUserService';
import AppError from '@shared/erros/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('shold be able to athenticate', async () => {
    const fakeAuthenticateRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeAuthenticateRepository,
      fakeHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeAuthenticateRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Jhon',
      email: 'alisson@teste.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'alisson@teste.com',
      password: '123456',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('shold not be able to athenticate with non exist user', async () => {
    const fakeAuthenticateRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeAuthenticateRepository,
      fakeHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeAuthenticateRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUserService.execute({
        email: 'alisson@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('shold not be able to athenticate with wring password', async () => {
    const fakeAuthenticateRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeAuthenticateRepository,
      fakeHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeAuthenticateRepository,
      fakeHashProvider,
    );

    await expect(
      authenticateUserService.execute({
        email: 'alisson@teste.com',
        password: 'nnnnn',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
