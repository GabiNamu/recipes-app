import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blkHeart from '../images/blackHeartIcon.svg';
import whtHeart from '../images/whiteHeartIcon.svg';
import { Context } from '../context/provider/ApiProvider';

function DrinkInProgress({ productId }) {
  const { setRecipes } = useContext(Context);
  const history = useHistory();
  const thisPath = history.location.pathname;
  const [heart, setHeart] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [finishBtn, setFinishBtn] = useState(true);
  const [success, setSuccess] = useState(false);
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

  const ingredients = Object.entries(cocktail)
    .filter(([key]) => key.includes('strIngredient'))
    .map(([, value]) => value)
    .filter((value) => value !== '' && value !== null);

  useEffect(() => {
    const allChecked = ingredients.every(
      (ingredient) => checkboxState[ingredient],
    );
    setFinishBtn(!allChecked);
  }, [checkboxState, ingredients]);

  useEffect(() => {
    const getFavoriteLocalStorage = () => {
      setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
    };
    getFavoriteLocalStorage();
  }, []);

  useEffect(() => {
    const getHeart = favorites?.some((favorite) => favorite.id === productId);
    console.log(favorites);
    setHeart(getHeart);
  }, [favorites, productId]);

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

  const todaysDate = () => {
    const date = new Date();
    return date.toISOString();
  };

  const handleFinish = () => {
    const tagStr = cocktail.strTags === null ? '' : cocktail.strTags.split(',');

    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    // Check if the array exists, if not create an empty array
    if (!doneRecipes) {
      doneRecipes = [];
    }
    // Add a new object to the array
    const newRecipe = {
      id: productId,
      type: 'drink',
      nationality: cocktail.strArea || '',
      category: cocktail.strCategory || '',
      alcoholicOrNot: cocktail.strAlcoholic || '',
      name: cocktail.strDrink,
      image: cocktail.strDrinkThumb,
      doneDate: todaysDate(),
      tags: tagStr || [],
    };
    doneRecipes.push(newRecipe);
    // Store the updated array back in local storage
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    setRecipes((prevState) => [...prevState, newRecipe]);
    history.push('/done-recipes');
  };

  const handleFavorite = async () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // Check if the array exists, if not create an empty array
    if (!favoriteRecipes) {
      favoriteRecipes = [];
    } else if (favoriteRecipes.some((recipe) => recipe.id === productId)) {
      const wanted = favoriteRecipes.filter(
        (recipe) => recipe.id !== productId,
      );
      setHeart(false);
      return localStorage.setItem('favoriteRecipes', JSON.stringify(wanted));
    }
    const newFavorite = {
      id: productId,
      type: 'drink',
      nationality: cocktail.strArea || '',
      category: cocktail.strCategory || '',
      alcoholicOrNot: cocktail.strAlcoholic || '',
      name: cocktail.strDrink,
      image: cocktail.strDrinkThumb,
    };
    favoriteRecipes.push(newFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setHeart(true);
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
        <button
          data-testid="finish-recipe-btn"
          disabled={ finishBtn }
          onClick={ handleFinish }
        >
          Finish
        </button>
        <button data-testid="share-btn" onClick={ handleShare }>
          <img src={ shareIcon } alt="" />
        </button>
        <button onClick={ handleFavorite }>
          {heart ? (
            <img src={ blkHeart } alt="" data-testid="favorite-btn" />
          ) : (
            <img src={ whtHeart } alt="" data-testid="favorite-btn" />
          )}
        </button>
        {success && <span>Link copied!</span>}
      </div>
    </div>
  );
}

DrinkInProgress.propTypes = {}.isRequired;
export default DrinkInProgress;
