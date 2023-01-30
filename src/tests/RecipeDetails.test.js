import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('some tests in the RecipeDetails component', () => {
  it('render properly all infos', () => {
    act(() => {
      renderWithRouter(<App />);
    });
  });
});
