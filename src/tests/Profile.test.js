import React from 'react';
import { Redirect } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import ApiProvider from '../context/provider/ApiProvider';
import App from '../App';
import { mock, storageMock } from './helpers/mockData';

test('Profile', async () => {
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

  Object.defineProperty(window, 'localStorage', { value: storageMock });

  Redirect('/profile');

  const userEmail = screen.getByTestId('profile-email');
  const doneRecipes = screen.getByTestId('profile-done-btn');
  const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
  const logout = screen.getByTestId('profile-logout-btn');
  expect(userEmail).toBeInTheDocument();
  expect(doneRecipes).toBeInTheDocument();
  expect(favoriteRecipes).toBeInTheDocument();
  expect(logout).toBeInTheDocument();

  userEvent.click(doneRecipes);
  expect(screen.getByText(/Done Recipes/i)).toBeInTheDocument();
});
