import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/apiClient';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('shold be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: '123',
        name: 'John Doe',
        email: 'johndo@example.com.br',
      },
      token: 'token-123',
    };
    apiMock.onPost('/sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    result.current.signIn({
      email: 'johndo@example.com.br',
      password: '123456',
    });
    await waitForNextUpdate();
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual('johndo@example.com.br');
  });

  it('shold restore salve data from storarge when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: '123',
            name: 'John Doe',
            email: 'johndo@example.com.br',
          });
        default:
          return null;
      }
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    expect(result.current.user.email).toEqual('johndo@example.com.br');
  });

  it('shold be able signout', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: '123',
            name: 'John Doe',
            email: 'johndo@example.com.br',
          });
        default:
          return null;
      }
    });
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('shold be able update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    const user = {
      id: '123',
      name: 'John Doe',
      email: 'johndo@example.com.br',
      avatar_url: 'imge-url.jpg',
    };
    act(() => {
      result.current.updateUser(user);
    });
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );
    expect(result.current.user).toEqual(user);
  });
});
