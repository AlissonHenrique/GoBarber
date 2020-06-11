import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/erros/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('shold be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: ' João',
      email: 'joao@gmail.com',
      password: '22222',
    });
    await expect(user).toHaveProperty('id');
  });
  it('shold be able to  create a new user with same email', async () => {
    await createUserService.execute({
      name: ' João',
      email: 'joao@gmail.com',
      password: '22222',
    });
    await expect(
      createUserService.execute({
        name: ' João',
        email: 'joao@gmail.com',
        password: '22222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
