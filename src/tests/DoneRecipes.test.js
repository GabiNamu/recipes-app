import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import ApiProvider from '../context/provider/ApiProvider';
import { mock, storageMockDoneRecipes } from './helpers/mockData';
import App from '../App';

const doneRecipes = '/done-recipes';

test('', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mock),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );

  Object.defineProperty(window, 'localStorage', { value: storageMockDoneRecipes });
  await act(async () => {
    history.push(doneRecipes);
  });

  const gg = await screen.findByTestId('0-horizontal-name');
  const corba = await screen.findByTestId('1-horizontal-name');
  const corbaimg = screen.getByRole('img', {
    name: /corba/i,
  });
  const ggimg = screen.getByRole('img', {
    name: /gg/i,
  });

  expect(gg).toBeInTheDocument();
  expect(corba).toBeInTheDocument();
  expect(ggimg).toBeInTheDocument();
  expect(corbaimg).toBeInTheDocument();

  const mealsButton = screen.getByRole('button', {
    name: /meals/i,
  });

  userEvent.click(mealsButton);
  const category = screen.getByTestId('0-horizontal-top-text');
  expect(category).toBeInTheDocument();
  expect(screen.getByText('Brazil - Side')).toBeInTheDocument();
  expect(screen.queryByText(/gg/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/corba/i)).toBeInTheDocument();

  const drinksButton = screen.getByRole('button', {
    name: /drinks/i,
  });
  userEvent.click(drinksButton);
  expect(category).toBeInTheDocument();
  expect(screen.getByText(/alcoholic/i)).toBeInTheDocument();
  expect(screen.queryByText(/gg/i)).toBeInTheDocument();
  expect(screen.queryByText(/corba/i)).not.toBeInTheDocument();

  const AllButton = screen.getByRole('button', {
    name: /all/i,
  });
  userEvent.click(AllButton);
  expect(screen.queryByText(/gg/i)).toBeInTheDocument();
  expect(screen.queryByText(/corba/i)).toBeInTheDocument();

  userEvent.click(screen.getByTestId('1-horizontal-name'));
  expect(history.location.pathname).toBe('/meals/52977');

  await act(async () => {
    history.push(doneRecipes);
  });

  userEvent.click(await screen.findByTestId('0-horizontal-name'));
  expect(history.location.pathname).toBe('/drinks/15997');

  await act(async () => {
    history.push(doneRecipes);
  });

  const imageButton = screen.getByTestId('0-horizontal-image');
  userEvent.click(imageButton);
  expect(history.location.pathname).toBe('/drinks/15997');

  await act(async () => {
    history.push(doneRecipes);
  });
  const imageButtonMeals = screen.getByTestId('1-horizontal-image');
  userEvent.click(imageButtonMeals);
  expect(history.location.pathname).toBe('/meals/52977');
});
