import React, { useContext, useState } from 'react';
import { BsFillShareFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/provider/ApiProvider';

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
          <div
            key={ index }
            className="main-container-done-favorites"
          >
            <div>
              <button
                type="button"
                onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
              >
                <img
                  className="img-done-favorites"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </button>
            </div>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </p>
            <button
              className="button-card-done-favorites"
              type="button"
              onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
            >
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </button>

            <button
              type="button"
              className="button-share-done-favorites"
              onClick={ () => handleShare(recipe.type, recipe.id) }
            >
              <BsFillShareFill className="share-favorites" />
            </button>
            <button
              onClick={ () => handleFavorite(recipe.id) }
              className="button-favorites"
            >
              <AiFillHeart className="heart-favorites" />
            </button>
            {show && <p>Link copied!</p>}
          </div>
        ))}
    </div>
  );
}

export default FavoriteCard;
