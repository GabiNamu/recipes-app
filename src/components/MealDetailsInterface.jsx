import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteRecipeButton from './FavoriteRecipeButton';
import RecomendationsCards from './RecomendationsCards';
import ShareRecipeButton from './ShareRecipeButton';
import StartRecipeButton from './StartRecipeButton';

function MealDetailsInterface({ props: [loading, setLoading, id] }) {
  const [recipeRequestApi, setRecipeRequestApi] = useState(null);
  const [drinksRecommendation, setDrinksRecommendation] = useState(null);

  const mealSubStrIndexStart = 32;
  const carouselRendering = 6;

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipeRequestApi(data.meals[0]))
      .catch((error) => console.log(error));

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setDrinksRecommendation(data.drinks))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const mealIngredients = Object.entries(recipeRequestApi)
    .filter((pair) => (pair[0].includes('strIngredient')));
  const mealQuantityIngredients = Object.entries(recipeRequestApi)
    .filter((pair) => (pair[0].includes('strMeasure')));
  const mealRecipeVideoUrl = recipeRequestApi.strYoutube
    .substr(mealSubStrIndexStart);

  return (
    <div>
      <h1 data-testid="recipe-category">
        {recipeRequestApi.strCategory}
      </h1>
      <h2 data-testid="recipe-title">
        {recipeRequestApi.strMeal}
      </h2>
      <img
        width="40%"
        src={ recipeRequestApi.strMealThumb }
        alt="RecipeImg"
        data-testid="recipe-photo"
      />
      {mealIngredients?.map((pair, index) => (
        pair[1]
      && (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          { `${pair[1]} `}
          { mealQuantityIngredients[index][1]
        && `: ${mealQuantityIngredients[index][1]}`}
        </li>
      )
      ))}
      <p data-testid="instructions">
        {recipeRequestApi.strInstructions}
      </p>
      <iframe
        width="80%"
        height="80%"
        src={ `https://www.youtube.com/embed/${mealRecipeVideoUrl}` }
        title="YouTube video player"
        allow="accelerometer; autoplay;
        clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        data-testid="video"
      />
      <RecomendationsCards
        recipesRecomendations={ drinksRecommendation
          .slice(undefined, carouselRendering) }
      />
      <StartRecipeButton
        recipeRequestApi={ recipeRequestApi }
      />
      <ShareRecipeButton />
      <FavoriteRecipeButton />
    </div>
  );
}

MealDetailsInterface.propTypes = {
  props: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};

export default MealDetailsInterface;
