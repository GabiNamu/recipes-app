import React from 'react';
import Proptypes from 'prop-types';

function StartRecipeButton({ recipesRequestApi }) {
  if (localStorage.getItem('doneRecipes')) {
    if (JSON.parse(localStorage.getItem('doneRecipes'))
      .find({}.id === recipesRequestApi.drinks[0].idDrink)) {
      return;
    }
    return (
      <button
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: 0 } }
      >
        Start Recipe
      </button>
    );
  }
  return (
    <button
      data-testid="start-recipe-btn"
      style={ { position: 'fixed', bottom: 0 } }
    >
      Start Recipe
    </button>
  );
}

StartRecipeButton.propTypes = {
  recipesRequestApi: Proptypes.shape(Proptypes.array.isRequired).isRequired,
};

export default StartRecipeButton;
