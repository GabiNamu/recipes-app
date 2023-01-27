import React, { useEffect, useState } from 'react';

function MealInProgress({ productId }) {
  const [thisRecipe, setThisRecipe] = useState({});
  console.log(thisRecipe);

  const thisMeal = thisRecipe.meals[0];

  const ingredients = Object.entries(thisMeal)
    .filter(([key]) => key.includes('strIngredient'))
    .map(([, value]) => value);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${productId}`)
      .then((response) => response.json())
      .then((data) => setThisRecipe(data))
      .catch((error) => console.log(error));
  }, [productId]);

  return (
    <div>
      <div>
        <img data-testid="recipe-photo" src={ thisMeal.strMealThumb } alt="" />
        <h3 data-testid="recipe-title">{thisMeal.strMeal}</h3>
        <h5 data-testid="recipe-category">{thisMeal.strCategory}</h5>
        <h5>How to prepare your meal</h5>
        <p data-testid="instructions">{thisMeal.strInstructions}</p>
        <h5>Ingredients</h5>
        <div>
          {ingredients.map((ingredient, i) => (
            <div key={ i }>
              <span>{ingredient}</span>
              {ingredient === '' ? (
                ''
              ) : (
                <input
                  type="checkbox"
                  name={ ingredient }
                  id={ i }
                  value={ ingredient }
                />
              )}
            </div>
          ))}
        </div>
        <button data-testid="finish-recipe-btn">Finish</button>
        <button data-testid="share-btn">Share</button>
        <button data-testid="favorite-btn">Favorite</button>
      </div>
    </div>
  );
}

MealInProgress.propTypes = {}.isRequired;
export default MealInProgress;
