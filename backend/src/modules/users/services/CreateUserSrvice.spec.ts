import 'reflect-metadata';
import CreateUserService from './createUserService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/erros/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
describe('CreateUser', () => {
  it('shold be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const user = await createUserService.execute({
      name: ' João',
      email: 'joao@gmail.com',
      password: '22222',
    });
    expect(user).toHaveProperty('id');
  });
  it('shold be able to  create a new user with same email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: ' João',
      email: 'joao@gmail.com',
      password: '22222',
    });
    expect(
      createUserService.execute({
        name: ' João',
        email: 'joao@gmail.com',
        password: '22222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
