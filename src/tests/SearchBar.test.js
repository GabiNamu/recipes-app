import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import ApiProvider from '../context/provider/ApiProvider';
import App from '../App';
import { mockIngredients, mockFirstLetter, mockDrinkIngredients, mockDrinkFirstLetter, mockDrink, mockCategoryDrink } from './helpers/mockData';

test('SearchBar - meals - ingredients', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockIngredients),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  history.push('meals');

  const searchIcon = await screen.findByRole('img', {
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

test('SearchBar - meals - name', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue({ meals: [
      {
        strMeal: 'Burek',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
        idMeal: '53060',
      }] }),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  history.push('/meals');

  const searchIcon = await screen.findByRole('img', {
    name: /ícone de pesquisa/i,
  });
  expect(searchIcon).toBeInTheDocument();
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

  // expect(await screen.findByRole('heading', {
  //   name: /recipedetails/i,
  // })).toBeInTheDocument();
});

test('SearchBar - meals - first letter', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockFirstLetter),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  history.push('/meals');

  const searchIcon = await screen.findByRole('img', {
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

test('SearchBar - drinks - ingredients', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockDrinkIngredients),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  history.push('drinks');

  const searchIcon = await screen.findByRole('img', {
    name: /ícone de pesquisa/i,
  });
  userEvent.click(searchIcon);

  const input = screen.getByRole('textbox');
  const ingredients = screen.getByRole('radio', {
    name: /ingredient/i,
  });
  const buttonSearch = screen.getByRole('button', {
    name: /search/i,
  });

  expect(input).toBeInTheDocument();
  expect(ingredients).toBeInTheDocument();
  expect(buttonSearch).toBeInTheDocument();

  userEvent.type(input, 'Absolut Vodka');
  userEvent.click(ingredients);
  userEvent.click(buttonSearch);
  expect(await screen.findByText(/Absolut Stress #2/i)).toBeInTheDocument();
  expect(await screen.findByText(/Absolutely Cranberry Smash/i)).toBeInTheDocument();
  expect(await screen.findByText(/Arizona Stingers/i)).toBeInTheDocument();
  expect(await screen.findByText(/AT&T/i)).toBeInTheDocument();
});

test('SearchBar - drinks - name', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(mockDrink),
  });
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(mockCategoryDrink),
  });
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue({ drinks: [
      {
        strDrink: 'Arizona Stingers',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/y7w0721493068255.jpg',
        idDrink: '14584',
      }] }),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  history.push('/drinks');

  const searchIcon = await screen.findByRole('img', {
    name: /ícone de pesquisa/i,
  });
  expect(searchIcon).toBeInTheDocument();
  userEvent.click(searchIcon);

  const input = screen.getByRole('textbox');
  const name = screen.getByRole('radio', {
    name: /name/i,
  });
  const buttonSearch = screen.getByRole('button', {
    name: /search/i,
  });
  userEvent.type(input, 'Arizona Stingers');
  userEvent.click(name);
  userEvent.click(buttonSearch);

  // expect(await screen.findByText(/Arizona Stingers/i)).toBeInTheDocument();
});

test('SearchBar - drinks - first letter', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockDrinkFirstLetter),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  history.push('/drinks');

  const searchIcon = await screen.findByRole('img', {
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

  userEvent.type(input, 'y');
  userEvent.click(firstLetter);
  userEvent.click(buttonSearch);
  expect(await screen.findByText(/Yellow Bird/i)).toBeInTheDocument();
  expect(await screen.findByText(/Yoghurt Cooler/i)).toBeInTheDocument();
});

test('SearchBar - drinks - alert', async () => {
  global.alert = jest.fn();
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue({ drinks: null }),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );

  await act(async () => {
    history.push('/drinks');
  });

  const searchIcon = await screen.findByRole('img', {
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

  userEvent.type(input, 'x');
  userEvent.click(firstLetter);
  userEvent.click(buttonSearch);
  // expect(global.alert).toHaveBeenCalledTimes(1);
});
