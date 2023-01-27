import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Recipes from '../pages/Recipes';

test('Header', () => {
  const { history } = renderWithRouter(<Recipes />);

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
  expect(history.location.pathname).toBe('/meals');

  userEvent.click(searchIcon);

  const input = screen.queryByRole('textbox');
  expect(input).toBeInTheDocument();

  userEvent.click(searchIcon);

  expect(input).not.toBeInTheDocument();

  userEvent.click(profileIcon);
  expect(history.location.pathname).toBe('/profile');
  expect(searchIcon).not.toBeInTheDocument();
});
