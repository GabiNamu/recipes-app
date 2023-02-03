import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import '../styles/RecipeDetails.css';

function FavoriteRecipeButton({ recipeRequestApi }) {
  const history = useHistory();
  const noMagicNumber = -1;
  const favoriteRecipe = {
    id: recipeRequestApi.idDrink || recipeRequestApi.idMeal,
    type: history.location.pathname.split('/')[1].slice(0, noMagicNumber),
    nationality: recipeRequestApi.strArea || '',
    category: recipeRequestApi.strCategory || '',
    alcoholicOrNot: recipeRequestApi.strAlcoholic || '',
    name: recipeRequestApi.strDrink || recipeRequestApi.strMeal,
    image: recipeRequestApi.strDrinkThumb || recipeRequestApi.strMealThumb,
  };
  const [renderUpdateButton, setRenderUpdateButton] = useState(false);

  const handleClick = () => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes.some((element) => element.id === favoriteRecipe.id)) {
        setRenderUpdateButton(true);
        const removeFavorite = favoriteRecipes
          .filter((element) => element.id !== favoriteRecipe.id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
      } else {
        setRenderUpdateButton(true);
        localStorage
          .setItem('favoriteRecipes', JSON
            .stringify([...favoriteRecipes, favoriteRecipe]));
      }
    } else {
      setRenderUpdateButton(true);
      const favoriteRecipes = [];
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify([...favoriteRecipes, favoriteRecipe]));
    }
  };

  useEffect(() => {
    setRenderUpdateButton(false);
  }, [renderUpdateButton]);

  return (
    <button
      type="button"
      onClick={ handleClick }
      id="favorite-btn"
    >
      {
        localStorage.getItem('favoriteRecipes')
        && JSON.parse(localStorage.getItem('favoriteRecipes'))
          .some((recipe) => recipe.id === favoriteRecipe.id)
          ? <AiFillHeart className="icon-details heart" />
          : <AiOutlineHeart className="icon-details heart" />
      }
    </button>
  );
}

FavoriteRecipeButton.propTypes = {
  recipeRequestApi: Proptypes.shape(Proptypes.any.isRequired).isRequired,
};

export default FavoriteRecipeButton;
