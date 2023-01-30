import React, { useEffect, useState } from 'react';

function MealInProgress({ productId }) {
  const [mealDetails, setMealDetails] = useState({});
  const [checkboxState, setCheckboxState] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) || {},
  );

  console.log(productId);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${productId}`)
      .then((response) => response.json())
      .then((data) => setMealDetails(data.meals[0]))
      .catch((error) => console.error(error));
  }, [productId]);

  const ingredients = Object.entries(mealDetails)
    .filter(([key]) => key.includes('strIngredient'))
    .map(([, value]) => value)
    .filter((value) => value !== '' && value !== null);

  console.log(ingredients);

  const handleCheckboxChange = ({ target }) => {
    const { value } = target;
    setCheckboxState((prevState) => {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          ...prevState,
          [value]: !prevState[value],
        }),
      );
      return {
        ...prevState,
        [value]: !prevState[value],
      };
    });
  };

  return (
    <div>
      <div>
        <img data-testid="recipe-photo" src={ mealDetails.strMealThumb } alt="" />
        <h3 data-testid="recipe-title">{mealDetails.strMeal}</h3>
        <h5 data-testid="recipe-category">{mealDetails.strCategory}</h5>
        <h5>How to prepare your meal</h5>
        <p data-testid="instructions">{mealDetails.strInstructions}</p>
        <h5>Ingredients</h5>
        <div>
          {ingredients.map((ingredient, i) => (
            <div key={ i }>
              <label
                htmlFor={ ingredient }
                data-testid={ `${i}-ingredient-step` }
                style={ {
                  textDecoration: checkboxState[ingredient]
                    ? 'line-through solid rgb(0, 0, 0)'
                    : 'none',
                } }
              >
                {ingredient}
                <input
                  type="checkbox"
                  name={ ingredient }
                  id={ i }
                  value={ ingredient }
                  checked={ checkboxState[ingredient] }
                  onChange={ handleCheckboxChange }
                />
              </label>
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
