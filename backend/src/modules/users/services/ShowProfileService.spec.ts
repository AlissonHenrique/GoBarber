import 'reflect-metadata';
import AppError from '@shared/erros/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfile from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfile;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfile = new ShowProfile(fakeUserRepository);
  });

  it('shold be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'alisson',
      email: 'alisson@gmail.com',
      password: '22222',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });
    await expect(profile.name).toBe('alisson');
    await expect(profile.email).toBe('alisson@gmail.com');
  });

  it('shold not be able to show the profile from not exist user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-exist-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
