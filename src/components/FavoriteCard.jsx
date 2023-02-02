import React, { useContext, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/provider/ApiProvider';
import shareIcon from '../images/shareIcon.svg';
import blkHeart from '../images/blackHeartIcon.svg';

function FavoriteCard() {
  const history = useHistory();
  const { Recipes, setRecipes } = useContext(Context);
  const [show, setShow] = useState(false);

  const handleShare = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setShow(true);
  };

  const handleFavorite = (id) => {
    const wanted = Recipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(wanted));
    setRecipes(wanted);
  };

  return (
    <div>
      {Recipes.length !== 0
        && Recipes.map((recipe, index) => (
          <div key={ index } style={ { width: '200px' } }>
            <button
              type="button"
              onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
            >
              <img
                style={ { width: '200px' } }
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </button>

            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </p>
            <button
              type="button"
              onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
            >
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </button>

            <button
              type="button"
              onClick={ () => handleShare(recipe.type, recipe.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share icon"
              />
            </button>
            <button onClick={ () => handleFavorite(recipe.id) }>
              <img
                src={ blkHeart }
                alt=""
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
            {show && <p>Link copied!</p>}
          </div>
        ))}
    </div>
  );
}

export default FavoriteCard;
