import 'reflect-metadata';
import AppError from '@shared/erros/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfile from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfile;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfile(fakeUserRepository, fakeHashProvider);
  });

  it('shold be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: ' João',
      email: 'joao@gmail.com',
      password: '22222',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'alisson',
      email: 'alisson@live.com',
    });
    await expect(updatedUser.name).toBe('alisson');
    await expect(updatedUser.email).toBe('alisson@live.com');
  });

  it('shold not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: ' teste',
      email: 'joao@gmail.com',
      password: '22222',
    });

    const user = await fakeUserRepository.create({
      name: ' João',
      email: 'teste@gmail.com',
      password: '123213',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste',
        email: 'joao@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: ' João',
      email: 'joao@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'João',
      email: 'joao@gmail.com',
      old_password: '123456',
      password: '123123',
    });
    await expect(updatedUser.password).toBe('123123');
  });

  it('shold not be able to update the password withoud old passsword', async () => {
    const user = await fakeUserRepository.create({
      name: ' João',
      email: 'joao@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'João',
        email: 'joao@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to update the password withoud wrong old passsword', async () => {
    const user = await fakeUserRepository.create({
      name: ' João',
      email: 'joao@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'João',
        email: 'joao@gmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to update the profile from not exist user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-exist-user-id',
        name: 'Test',
        email: 'test@example',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
