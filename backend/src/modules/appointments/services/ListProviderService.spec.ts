import 'reflect-metadata';
import AppError from '@shared/erros/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderServise';

let fakeUserRepository: FakeUserRepository;
let listProvider: ListProviderService;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listProvider = new ListProviderService(fakeUserRepository);
  });

  it('shold be able to list the provider', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jhon@example.com',
      password: '123456',
    });
    const user2 = await fakeUserRepository.create({
      name: 'John Tre',
      email: 'jhontre@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'jhonqua@example.com',
      password: '123456',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });
    await expect(providers).toEqual([user1, user2]);
  });
});
