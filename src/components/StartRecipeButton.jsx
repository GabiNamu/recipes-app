import React from 'react';
import Proptypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function StartRecipeButton({ recipesRequestApi }) {
  const history = useHistory();

  const handleClick = () => {
    const thisPath = history.location.pathname;
    const productId = thisPath.split('/')[2];
    const recipeType = thisPath.split('/')[1];
    history.push(`/${recipeType}/${productId}/in-progress`);
  };

  if (localStorage.getItem('doneRecipes')) {
    if (JSON.parse(localStorage.getItem('doneRecipes'))
      .find({}.id === recipesRequestApi.drinks[0].idDrink
        || recipesRequestApi.meals[0].idMeal)) {
      return;
    }
    return (
      <button
        data-testid="start-recipe-btn"
        type="button"
        style={ { position: 'fixed', bottom: 0 } }
        onClick={ handleClick }
      >
        Start Recipe
      </button>
    );
  }
  if (localStorage.getItem('inProgressRecipes')
  && (JSON.parse(localStorage.getItem('inProgressRecipes')).drinks)) {
    if (Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes')).drinks)
      .some((element) => element === recipesRequestApi.drinks[0].idDrink)) {
      return (
        <button
          data-testid="start-recipe-btn"
          type="button"
          style={ { position: 'fixed', bottom: 0 } }
          onClick={ handleClick }
        >
          Continue Recipe
        </button>
      );
    }
    return (
      <button
        data-testid="start-recipe-btn"
        type="button"
        style={ { position: 'fixed', bottom: 0 } }
        onClick={ handleClick }
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
          type="button"
          style={ { position: 'fixed', bottom: 0 } }
          onClick={ handleClick }
        >
          Continue Recipe
        </button>
      );
    }
    return (
      <button
        data-testid="start-recipe-btn"
        type="button"
        style={ { position: 'fixed', bottom: 0 } }
        onClick={ handleClick }
      >
        Start Recipe
      </button>
    );
  }
  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      style={ { position: 'fixed', bottom: 0 } }
      onClick={ handleClick }
    >
      Start Recipe
    </button>
  );
}

StartRecipeButton.propTypes = {
  recipesRequestApi: Proptypes.shape(Proptypes.array.isRequired).isRequired,
};

export default StartRecipeButton;
