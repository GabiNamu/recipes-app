import React from 'react';
import Proptypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function StartRecipeButton({ recipeRequestApi }) {
  const history = useHistory();

  const handleClick = () => {
    const thisPath = history.location.pathname;
    const productId = thisPath.split('/')[2];
    const recipeType = thisPath.split('/')[1];
    history.push(`/${recipeType}/${productId}/in-progress`);
  };

  if (localStorage.getItem('doneRecipes')) {
    console.log(JSON.parse(localStorage.getItem('doneRecipes')));
    if (JSON.parse(localStorage.getItem('doneRecipes'))
      .find(({ id }) => id === recipeRequestApi.idDrink
        || id === recipeRequestApi.idMeal)) {
      return;
    }
    return (
      <button
        data-testid="start-recipe-btn"
        className="button-details"
        type="button"
        style={ { position: 'fixed', bottom: 0, zIndex: '1' } }
        onClick={ handleClick }
      >
        Start Recipe
      </button>
    );
  }
  if (localStorage.getItem('inProgressRecipes')
  && (JSON.parse(localStorage.getItem('inProgressRecipes')).drinks)) {
    if (Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes')).drinks)
      .some((element) => element === recipeRequestApi.idDrink)) {
      return (
        <button
          data-testid="start-recipe-btn"
          className="button-details"
          type="button"
          style={ { position: 'fixed', bottom: 0, zIndex: '1' } }
          onClick={ handleClick }
        >
          Continue Recipe
        </button>
      );
    }
    return (
      <button
        data-testid="start-recipe-btn"
        className="button-details"
        type="button"
        style={ { position: 'fixed', bottom: 0, zIndex: '1' } }
        onClick={ handleClick }
      >
        Start Recipe
      </button>
    );
  }
  if (localStorage.getItem('inProgressRecipes')
  && (JSON.parse(localStorage.getItem('inProgressRecipes')).meals)) {
    if (Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes')).meals)
      .some((element) => element === recipeRequestApi.idMeal)) {
      return (
        <button
          data-testid="start-recipe-btn"
          type="button"
          style={ { position: 'fixed', bottom: 0, zIndex: '1' } }
          onClick={ handleClick }
        >
          Continue Recipe
        </button>
      );
    }
    return (
      <button
        className="button-details"
        data-testid="start-recipe-btn"
        type="button"
        style={ { position: 'fixed', bottom: 0, zIndex: '1' } }
        onClick={ handleClick }
      >
        Start Recipe
      </button>
    );
  }
  return (
    <button
      className="button-details"
      data-testid="start-recipe-btn"
      type="button"
      style={ { position: 'fixed', bottom: 0, zIndex: '1' } }
      onClick={ handleClick }
    >
      Start Recipe
    </button>
  );
}

StartRecipeButton.propTypes = {
  recipeRequestApi: Proptypes.shape(Proptypes.array.isRequired).isRequired,
};

export default StartRecipeButton;
