import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldname: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('shold be able to render input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );
    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('shold be render on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );
    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color:#ff9000;');
      expect(containerElement).toHaveStyle('color:#ff9000;');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color:#ff9000;');
      expect(containerElement).not.toHaveStyle('color:#ff9000;');
    });
  });

  it('shold be keep input highlith when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );
    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('color:#ff9000;');
    });
  });
});
