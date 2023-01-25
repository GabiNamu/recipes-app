import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

test('Login', () => {
  const { history } = renderWithRouter(<App />);

  const email = screen.getByTestId('email-input');
  const password = screen.getByTestId('password-input');
  const button = screen.getByTestId('login-submit-btn');

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(history.location.pathname).toBe('/');

  userEvent.type(email, 'test');

  expect(button.disabled).toBe(true);

  email.value = '';
  userEvent.type(email, 'test@test.com');
  userEvent.type(password, '1234');

  expect(button.disabled).toBe(true);

  userEvent.type(password, '567');
  expect(button.disabled).toBe(false);

  userEvent.click(button);

  expect(history.location.pathname).toBe('/meals');
  const mealsTitle = screen.getByRole('heading', {
    name: /meals/i,
  });
  expect(mealsTitle).toBeInTheDocument();
});
