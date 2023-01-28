import React, { useContext, useState } from 'react';
import { Context } from '../context/provider/ApiProvider';

function MealInProgress() {
  const { recipeList } = useContext(Context);
  const [checkboxState, setCheckboxState] = useState({
    ingredient: false,
  });

  const thisMeal = recipeList.meals[0];

  const ingredients = Object.entries(thisMeal)
    .filter(([key]) => key.includes('strIngredient'))
    .map(([, value]) => value);

  const handleCheckboxChange = ({ target }) => {
    const { value } = target;
    setCheckboxState((prevState) => ({
      ...prevState,
      [value]: !prevState[value],
    }));
  };

  // useEffect(() => {
  //   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${productId}`)
  //     .then((response) => response.json())
  //     .then((data) => setRecipeList(data))
  //     .catch((error) => console.log(error));
  // }, [productId, setRecipeList]);

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
              <span
                style={ {
                  textDecoration: checkboxState[ingredient]
                    ? 'line-through solid rgb(0, 0, 0)'
                    : 'none',
                } }
              >
                {ingredient}
              </span>
              {ingredient === '' ? (
                ''
              ) : (
                <input
                  data-testid={ `${i}-ingredient-step` }
                  type="checkbox"
                  name={ ingredient }
                  id={ i }
                  value={ ingredient }
                  checked={ checkboxState[ingredient] }
                  onChange={ handleCheckboxChange }
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
