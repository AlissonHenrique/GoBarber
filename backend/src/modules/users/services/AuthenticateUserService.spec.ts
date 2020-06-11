import 'reflect-metadata';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/erros/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('shold be able to athenticate', async () => {
    const user = await createUser.execute({
      name: 'Jhon',
      email: 'alisson@teste.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'alisson@teste.com',
      password: '123456',
    });
    await expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('shold not be able to athenticate with non exist user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'alisson@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('shold not be able to athenticate with wring password', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'alisson@teste.com',
        password: 'nnnnn',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
