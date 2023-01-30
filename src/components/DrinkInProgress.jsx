import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DrinkInProgress({ productId }) {
  const history = useHistory();
  const thisPath = history.location.pathname;
  const [success, setSuccess] = useState(false);
  const [cocktail, setCocktail] = useState({});
  const [checkboxState, setCheckboxState] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) || {},
  );

  useEffect(() => {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${productId}`,
    )
      .then((response) => response.json())
      .then((data) => setCocktail(data.drinks[0]))
      .catch((error) => console.error(error));
  }, [productId]);

  const ingredients = Object.entries(cocktail)
    .filter(([key]) => key.includes('strIngredient'))
    .map(([, value]) => value)
    .filter((value) => value !== '' && value !== null);

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

  const handleShare = () => {
    copy(`http://localhost:3000${thisPath.replace('/in-progress', '')}`);
    setSuccess(true);
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
              <label
                htmlFor={ ingredient }
                data-testid={ `${i}-ingredient-step` }
                style={ {
                  textDecoration: checkboxState[ingredient] ? (
                    'line-through solid rgb(0, 0, 0)'
                  ) : (
                    'none'
                  ),
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
        <button data-testid="share-btn" onClick={ handleShare }>
          <img src={ shareIcon } alt="" />
        </button>
        <button data-testid="favorite-btn">Favorite</button>
        { success && <span>Link copied!</span> }
      </div>
    </div>
  );
}

DrinkInProgress.propTypes = {}.isRequired;
export default DrinkInProgress;
