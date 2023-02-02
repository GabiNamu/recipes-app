import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteRecipeButton from './FavoriteRecipeButton';
import RecomendationsCards from './RecomendationsCards';
import ShareRecipeButton from './ShareRecipeButton';
import StartRecipeButton from './StartRecipeButton';

function DrinkDetailsInterface({ props: [loading, setLoading, id] }) {
  const [recipeRequestApi, setRecipeRequestApi] = useState(null);
  const [mealsRecommendation, setMealsRecommendation] = useState(null);

  const carouselRendering = 6;

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipeRequestApi(data.drinks[0]))
      .catch((error) => console.log(error));

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setMealsRecommendation(data.meals))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const drinkIngredients = Object.entries(recipeRequestApi)
    .filter((pair) => (pair[0].includes('strIngredient')));
  const drinkQuantityIngredients = Object.entries(recipeRequestApi)
    .filter((pair) => (pair[0].includes('strMeasure')));

  return (
    <div>
      <h1 data-testid="recipe-category">
        { recipeRequestApi.strAlcoholic }
      </h1>
      <h2 data-testid="recipe-title">
        {recipeRequestApi.strDrink}
      </h2>
      <img
        width="40%"
        src={ recipeRequestApi.strDrinkThumb }
        alt="RecipeImg"
        data-testid="recipe-photo"
      />
      {drinkIngredients?.map((pair, index) => (
        pair[1]
            && (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                { `${pair[1]} `}
                { drinkQuantityIngredients[index][1]
              && `: ${drinkQuantityIngredients[index][1]}`}
              </li>
            )
      ))}
      <p data-testid="instructions">
        { recipeRequestApi.strInstructions}
      </p>
      <StartRecipeButton
        recipeRequestApi={ recipeRequestApi }
      />
      <ShareRecipeButton />
      <FavoriteRecipeButton
        recipeRequestApi={ recipeRequestApi }
      />
      <RecomendationsCards
        recipesRecomendations={ mealsRecommendation
          .slice(undefined, carouselRendering) }
      />
    </div>
  );
}

DrinkDetailsInterface.propTypes = {
  props: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};

export default DrinkDetailsInterface;
