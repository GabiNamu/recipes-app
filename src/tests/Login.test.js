import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockIngredients } from './helpers/mockData';
import renderWithRouter from './helpers/renderWithRouter';
import ApiProvider from '../context/provider/ApiProvider';

test('Login', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockIngredients),
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

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  userEvent.type(email, 'test');

  expect(button.disabled).toBe(true);

  email.value = '';
  userEvent.type(email, 'test@test.com');
  userEvent.type(password, '1234');

  expect(button.disabled).toBe(true);

  userEvent.type(password, '567');
  expect(button.disabled).toBe(false);

  userEvent.click(button);

  const mealsTitle = screen.getByRole('heading', {
    name: /meals/i,
  });
  expect(mealsTitle).toBeInTheDocument();
});
