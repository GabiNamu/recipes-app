import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import ApiProvider from '../context/provider/ApiProvider';
import App from '../App';
import { mock } from './helpers/mockData';

test('', async () => {
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

  expect(await screen.findByText(/corba/i)).toBeInTheDocument();
  const recipeButton = screen.getByRole('button', {
    name: /corba corba/i,
  });
  userEvent.click(recipeButton);
  expect(await screen.findByRole('heading', {
    name: /recipedetails/i,
  })).toBeInTheDocument();
});
