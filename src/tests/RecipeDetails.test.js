import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails';

describe('some tests in the RecipeDetails component', () => {
  it('render properly all infos', async () => {
    act(() => {
      const path = '/meals/:id';
      const id = '52882';
      renderWithRouter(<RecipeDetails { ...{ match: { path, params: { id } } } } />);
    });

    expect(await screen.findByRole('heading', {
      name: /seafood/i,
    })).toBeInTheDocument();
    expect(await screen.findByRole('heading', {
      name: /three fish pie/i,
    })).toBeInTheDocument();
    expect(await screen.findByRole('img', {
      name: /recipeimg/i,
    })).toBeInTheDocument();
    expect(await screen.findAllByTestId(/(\d+)-ingredient-name-and-measure/));
    expect(await screen.findByTestId('instructions')).toBeInTheDocument();
    expect(await screen.findByTitle(/youtube video player/i)).toBeInTheDocument();
    expect(await screen.findByRole('heading', {
      name: /recommended/i,
    })).toBeInTheDocument();
    expect((await screen.findAllByTestId(/(\d+)-recommendation-card/)).length).toBe(6);
    expect(await screen.findByRole('button', {
      name: /start recipe/i,
    }));
  });
});
