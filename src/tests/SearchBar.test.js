import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import ApiProvider from '../context/provider/ApiProvider';
import App from '../App';
import { mockIngredients, mockFirstLetter } from './helpers/mockData';

const data = ['email-input', 'password-input', 'login-submit-btn', 'test@test.com'];

test('', async () => {
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

  const email = screen.getByTestId(data[0]);
  const password = screen.getByTestId(data[1]);
  const button = screen.getByTestId(data[2]);

  userEvent.type(email, data[3]);
  userEvent.type(password, '123456789');
  userEvent.click(button);

  const searchIcon = screen.queryByRole('img', {
    name: /ícone de pesquisa/i,
  });
  userEvent.click(searchIcon);

  const input = screen.getByRole('textbox');
  const ingredients = screen.getByRole('radio', {
    name: /ingredient/i,
  });
  const name = screen.getByRole('radio', {
    name: /name/i,
  });
  const firstLetter = screen.getByRole('radio', {
    name: /first letter/i,
  });
  const buttonSearch = screen.getByRole('button', {
    name: /search/i,
  });

  expect(input).toBeInTheDocument();
  expect(ingredients).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(firstLetter).toBeInTheDocument();
  expect(buttonSearch).toBeInTheDocument();

  userEvent.type(input, 'Filo Pastry');
  userEvent.click(ingredients);
  userEvent.click(buttonSearch);
  expect(await screen.findByText(/burek/i)).toBeInTheDocument();
  expect(await screen.findByText(/tuna and egg briks/i)).toBeInTheDocument();
});

test('', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue({ meals: [
      {
        strMeal: 'Burek',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
        idMeal: '53060',
      }] }),
  });

  await act(async () => {
    renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );
  });

  const email = screen.getByTestId(data[0]);
  const password = screen.getByTestId(data[1]);
  const button = screen.getByTestId(data[2]);

  userEvent.type(email, data[3]);
  userEvent.type(password, '123456789');
  userEvent.click(button);

  const searchIcon = screen.queryByRole('img', {
    name: /ícone de pesquisa/i,
  });
  userEvent.click(searchIcon);

  const input = screen.getByRole('textbox');
  const name = screen.getByRole('radio', {
    name: /name/i,
  });
  const buttonSearch = screen.getByRole('button', {
    name: /search/i,
  });
  userEvent.type(input, 'burek');
  userEvent.click(name);
  userEvent.click(buttonSearch);

  expect(await screen.findByRole('heading', {
    name: /recipedetails/i,
  })).toBeInTheDocument();
});

test('', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockFirstLetter),
  });

  await act(async () => {
    renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );
  });

  const email = screen.getByTestId(data[0]);
  const password = screen.getByTestId(data[1]);
  const button = screen.getByTestId(data[2]);

  userEvent.type(email, data[3]);
  userEvent.type(password, '123456789');
  userEvent.click(button);

  const searchIcon = screen.queryByRole('img', {
    name: /ícone de pesquisa/i,
  });
  userEvent.click(searchIcon);

  const input = screen.getByRole('textbox');
  const firstLetter = screen.getByRole('radio', {
    name: /first letter/i,
  });
  const buttonSearch = screen.getByRole('button', {
    name: /search/i,
  });

  userEvent.type(input, 'd');
  userEvent.click(firstLetter);
  userEvent.click(buttonSearch);
  expect(await screen.findByRole('button', {
    name: /dal fry dal fry/i,
  })).toBeInTheDocument();
  expect(screen.getByRole('button', {
    name: /dundee cake dundee cake/i,
  })).toBeInTheDocument();
  expect(screen.getByRole('button', {
    name: /duck confit duck confit/i,
  })).toBeInTheDocument();
});
