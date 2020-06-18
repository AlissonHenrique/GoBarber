import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockAddToast = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({ push: mockHistoryPush }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});
jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockAddToast,
    }),
  };
});
describe('SignIn Page', () => {
  beforeEach(() => {
    mockHistoryPush.mockClear();
  });

  it('shold be able to signin', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shold be not able to sign witch invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');
    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('shold display error if login error fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
