import React from 'react';
import Proptypes from 'prop-types';

function StartRecipeButton({ recipesRequestApi }) {
  if (localStorage.getItem('doneRecipes')) {
    if (JSON.parse(localStorage.getItem('doneRecipes'))
      .find({}.id === recipesRequestApi.drinks[0].idDrink
        || recipesRequestApi.meals[0].idMeal)) {
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

  // const inProgressRecipes = {
  //   meals: {
  //     52771: [],
  //   },
  // };
  if (localStorage.getItem('inProgressRecipes')
  && (JSON.parse(localStorage.getItem('inProgressRecipes')).drinks)) {
    if (Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes')).drinks)
      .some((element) => element === recipesRequestApi.drinks[0].idDrink)) {
      return (
        <button
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: 0 } }
        >
          Continue Recipe
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
  if (localStorage.getItem('inProgressRecipes')
  && (JSON.parse(localStorage.getItem('inProgressRecipes')).meals)) {
    if (Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes')).meals)
      .some((element) => element === recipesRequestApi.meals[0].idMeal)) {
      return (
        <button
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: 0 } }
        >
          Continue Recipe
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
