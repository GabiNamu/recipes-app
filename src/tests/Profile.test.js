import React from 'react';
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

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );

  Object.defineProperty(window, 'localStorage', { value: storageMock });
  await act(async () => {
    history.push('/profile');
  });

  const userEmail = screen.getByTestId('profile-email');
  const doneRecipes = screen.getByTestId('profile-done-btn');

  expect(userEmail).toBeInTheDocument();
  expect(doneRecipes).toBeInTheDocument();

  userEvent.click(doneRecipes);
  expect(history.location.pathname).toBe('/done-recipes');

  await act(async () => {
    history.push('/profile');
  });
  const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
  expect(favoriteRecipes).toBeInTheDocument();
  userEvent.click(favoriteRecipes);
  expect(history.location.pathname).toBe('/favorite-recipes');

  await act(async () => {
    history.push('/profile');
  });
  const logout = screen.getByTestId('profile-logout-btn');
  expect(logout).toBeInTheDocument();
  userEvent.click(logout);
  expect(history.location.pathname).toBe('/');
});
