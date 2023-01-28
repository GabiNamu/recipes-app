import React, { useContext, useState } from 'react';
import { Context } from '../context/provider/ApiProvider';

function DrinkInProgress() {
  const { recipeList } = useContext(Context);
  const [checkboxState, setCheckboxState] = useState({
    ingredient: false,
  });

  const thisDrink = recipeList.drinks[0];

  const ingredients = Object.entries(thisDrink)
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
        <img data-testid="recipe-photo" src={ thisDrink.strDrinkThumb } alt="" />
        <h3 data-testid="recipe-title">{thisDrink.strDrink}</h3>
        <h5 data-testid="recipe-category">{thisDrink.strAlcoholic}</h5>
        <h5>How to prepare your drink</h5>
        <p data-testid="instructions">{thisDrink.strInstructions}</p>
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
              {ingredient === null ? (
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

DrinkInProgress.propTypes = {}.isRequired;
export default DrinkInProgress;
