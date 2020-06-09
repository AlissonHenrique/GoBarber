import 'reflect-metadata';
import AppError from '@shared/erros/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatar from './updateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('shold be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatar(
      fakeUserRepository,
      fakeStorageProvider,
    );
    const user = await fakeUserRepository.create({
      name: ' João',
      email: 'joao@gmail.com',
      password: '22222',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarfileName: 'avatar.jpg',
    });
    await expect(user.avatar).toBe('avatar.jpg');
  });

  it('shold not be able to updated avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatar(
      fakeUserRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'non-exist',
        avatarfileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold be able to delete old avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatar(
      fakeUserRepository,
      fakeStorageProvider,
    );
    const user = await fakeUserRepository.create({
      name: ' João',
      email: 'joao@gmail.com',
      password: '22222',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarfileName: 'avatar.jpg',
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarfileName: 'avatar2.jpg',
    });
    await expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    await expect(user.avatar).toBe('avatar2.jpg');
  });
});
