import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import ApiProvider from '../context/provider/ApiProvider';
import App from '../App';
import { mock, mockBeef, mockBreackfast, mockCategory, mockCocoa, mockDrink, mockGoat, mockOrdinary, mockShake } from './helpers/mockData';

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
  history.push('/meals');

  expect(await screen.findByText(/corba/i)).toBeInTheDocument();
  const recipeButton = screen.getByRole('button', {
    name: /corba corba/i,
  });
  userEvent.click(recipeButton);
  expect(await screen.findByRole('heading', {
    name: /recipedetails/i,
  })).toBeInTheDocument();
});

test('', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockCategory),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  history.push('/meals');

  const beef = await screen.findByRole('button', {
    name: /beef/i,
  });
  const Breakfast = await screen.findByRole('button', {
    name: /beef/i,
  });
  const Chicken = await screen.findByRole('button', {
    name: /beef/i,
  });
  const Dessert = await screen.findByRole('button', {
    name: /beef/i,
  });
  const Goat = await screen.findByRole('button', {
    name: /beef/i,
  });

  expect(beef).toBeInTheDocument();
  expect(Breakfast).toBeInTheDocument();
  expect(Chicken).toBeInTheDocument();
  expect(Dessert).toBeInTheDocument();
  expect(Goat).toBeInTheDocument();
});

test('', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockDrink),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  history.push('/drinks');
  expect(await screen.findByText(/GG/i)).toBeInTheDocument();
  expect(await screen.findByText(/A1/i)).toBeInTheDocument();
  expect(await screen.findByText(/ABC/i)).toBeInTheDocument();
  expect(await screen.findByText(/Kir/i)).toBeInTheDocument();

  const gg = screen.getByRole('button', {
    name: /gg gg/i,
  });

  userEvent.click(gg);

  expect(await screen.findByRole('heading', {
    name: /recipedetails/i,
  })).toBeInTheDocument();
});

test('', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockBeef),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  await act(async () => {
    history.push('/meals');
  });

  const button = await screen.findAllByRole('button');

  userEvent.click(button[2]);

  expect(await screen.findByText(/Beef and Mustard Pie/i)).toBeInTheDocument();
  expect(await screen.findByText(/Beef and Oyster pie/i)).toBeInTheDocument();
  expect(await screen.findByText(/Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber/i)).toBeInTheDocument();
});

test('', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockBreackfast),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  await act(async () => {
    history.push('/meals');
  });

  const button = await screen.findAllByRole('button');

  userEvent.click(button[3]);

  expect(await screen.findByText(/Breakfast Potatoes/i)).toBeInTheDocument();
  expect(await screen.findByText(/Home-made Mandazi/i)).toBeInTheDocument();
  expect(await screen.findByText(/Fruit and Cream Cheese Breakfast Pastries/i)).toBeInTheDocument();
});

test('', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockCocoa),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  await act(async () => {
    history.push('/drinks');
  });

  const button = await screen.findAllByRole('button');

  userEvent.click(button[6]);

  expect(await screen.findByText(/Castillian Hot Chocolate/i)).toBeInTheDocument();
  expect(await screen.findByText(/Chocolate Beverage/i)).toBeInTheDocument();
  expect(await screen.findByText(/Chocolate Drink/i)).toBeInTheDocument();
});

test('', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockOrdinary),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  await act(async () => {
    history.push('/drinks');
  });

  const button = await screen.findAllByRole('button');

  userEvent.click(button[2]);

  expect(await screen.findByText(/3-Mile Long Island Iced Tea/i)).toBeInTheDocument();
  expect(await screen.findByText(/410 Gone/i)).toBeInTheDocument();
  expect(await screen.findByText(/501 Blue/i)).toBeInTheDocument();
});

test('', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockGoat),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  await act(async () => {
    history.push('/meals');
  });

  const button = await screen.findAllByRole('button');

  userEvent.click(button[2]);

  expect(await screen.findByText(/Mbuzi Choma/i)).toBeInTheDocument();
});

test('', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockShake),
  });

  const { history } = renderWithRouter(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
  await act(async () => {
    history.push('/drinks');
  });

  const button = await screen.findAllByRole('button');

  userEvent.click(button[4]);

  expect(await screen.findByText(/151 Florida Bushwacker/i)).toBeInTheDocument();
  expect(await screen.findByText(/Avalanche/i)).toBeInTheDocument();
  expect(await screen.findByText(/Baby Eskimo/i)).toBeInTheDocument();
});
