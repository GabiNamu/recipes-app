import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecomendationsCards from './RecomendationsCards';

function RecipeDetailsInterface({ props: [loading, setLoading, path, id] }) {
  const [recipesRequestApi, setRecipesRequestApi] = useState(null);
  const [recipesRecomendations, setRecipesRecomendations] = useState(null);
  const mealSubStrIndexStart = 32;
  const carouselRendering = 6;

  useEffect(() => {
    fetch(path.includes('meals') ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipesRequestApi(data))
      .catch((error) => console.log(error));

    fetch(path.includes('meals') ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' : 'https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setRecipesRecomendations(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (path.includes('meals')) {
    const mealIngredients = Object.entries(recipesRequestApi.meals[0])
      .filter((pair) => (pair[0].includes('strIngredient'))
    && pair[1] !== null && pair[1] !== '');
    const mealQuantityIngredients = Object.entries(recipesRequestApi.meals[0])
      .filter((pair) => (pair[0].includes('strMeasure'))
    && pair[1] !== null && pair[1] !== '');
    const mealRecipeVideoUrl = recipesRequestApi.meals[0].strYoutube
      .substr(mealSubStrIndexStart);

    return (
      <div>
        <h1 data-testid="recipe-category">
          {recipesRequestApi.meals[0].strCategory}
        </h1>
        <h2 data-testid="recipe-title">
          {recipesRequestApi.meals[0].strMeal}
        </h2>
        <img
          width="40%"
          src={ recipesRequestApi.meals[0].strMealThumb }
          alt="RecipeImg"
          data-testid="recipe-photo"
        />
        {mealIngredients.map((pair, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${pair[1]} `}
            :
            {` ${mealQuantityIngredients[index][1]}` }
          </li>
        ))}
        <p data-testid="instructions">
          {recipesRequestApi.meals[0].strInstructions}
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
          recipesRecomendations={ recipesRecomendations.drinks
            .slice(undefined, carouselRendering) }
        />
      </div>
    );
  }

  const drinkIngredients = Object.entries(recipesRequestApi.drinks[0])
    .filter((pair) => (pair[0].includes('strIngredient'))
    && pair[1] !== null && pair[1] !== '');
  const drinkQuantityIngredients = Object.entries(recipesRequestApi.drinks[0])
    .filter((pair) => (pair[0].includes('strMeasure'))
    && pair[1] !== null && pair[1] !== '');

  return (
    <div>
      <h1 data-testid="recipe-category">
        { recipesRequestApi.drinks[0].strAlcoholic }
      </h1>
      <h2 data-testid="recipe-title">
        {recipesRequestApi.drinks[0].strDrink}
      </h2>
      <img
        width="40%"
        src={ recipesRequestApi.drinks[0].strDrinkThumb }
        alt="RecipeImg"
        data-testid="recipe-photo"
      />
      {drinkIngredients.map((pair, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {`${pair[1]} `}
          :
          {` ${drinkQuantityIngredients[index][1]}` }
        </li>
      ))}
      <p data-testid="instructions">
        { recipesRequestApi.drinks[0].strInstructions}
      </p>
      <RecomendationsCards
        recipesRecomendations={ recipesRecomendations.meals
          .slice(undefined, carouselRendering) }
      />
    </div>
  );
}

RecipeDetailsInterface.propTypes = {
  props: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};

export default RecipeDetailsInterface;
