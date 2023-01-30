import React, { useEffect, useState } from 'react';

function DrinkInProgress({ productId }) {
  const [cocktail, setCocktail] = useState({});
  const [checkboxState, setCheckboxState] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) || {},
  );

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${productId}`)
      .then((response) => response.json())
      .then((data) => setCocktail(data.drinks[0]))
      .catch((error) => console.error(error));
  }, [productId]);

  const ingredients = cocktail
    ? Object.entries(cocktail)
      .filter(([key]) => key.includes('strIngredient'))
      .map(([, value]) => value)
    : [];

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
        <img data-testid="recipe-photo" src={ cocktail.strDrinkThumb } alt="" />
        <h3 data-testid="recipe-title">{cocktail.strDrink}</h3>
        <h5 data-testid="recipe-category">{cocktail.strAlcoholic}</h5>
        <h5>How to prepare your drink</h5>
        <p data-testid="instructions">{cocktail.strInstructions}</p>
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
