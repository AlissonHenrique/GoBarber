import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatar from './UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatar;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatar(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });
  it('shold be able to create a new user', async () => {
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
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-exist',
        avatarfileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold be able to delete old avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
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
