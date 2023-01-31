import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import ApiProvider from '../context/provider/ApiProvider';
import App from '../App';
import { mock } from './helpers/mockData';

test('Header', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mock),
  });

  await act(async () => {
    renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );
  });

  const email = screen.getByTestId('email-input');
  const password = screen.getByTestId('password-input');
  const button = screen.getByTestId('login-submit-btn');

  userEvent.type(email, 'test@test.com');
  userEvent.type(password, '123456789');
  userEvent.click(button);

  const profileIcon = screen.getByRole('img', {
    name: /ícone de perfil/i,
  });
  const searchIcon = screen.queryByRole('img', {
    name: /ícone de pesquisa/i,
  });
  const title = screen.getByRole('heading', {
    name: /meals/i,
  });

  expect(profileIcon).toBeInTheDocument();
  expect(searchIcon).toBeInTheDocument();
  expect(title).toBeInTheDocument();

  userEvent.click(searchIcon);

  const input = screen.queryByRole('textbox');
  expect(input).toBeInTheDocument();

  userEvent.click(searchIcon);

  expect(input).not.toBeInTheDocument();

  userEvent.click(profileIcon);
  expect(searchIcon).not.toBeInTheDocument();
});
