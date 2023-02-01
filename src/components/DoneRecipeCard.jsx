import React, { useContext, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/provider/ApiProvider';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard() {
  const history = useHistory();
  const { Recipes } = useContext(Context);
  const [show, setShow] = useState(false);

  const handleShare = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setShow(true);
  };

  return (
    <div>
      {Recipes.length !== 0 && Recipes.map((recipe, index) => (
        <div key={ index }>
          <button
            type="button"
            onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
          >
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </button>

          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot }
          </p>
          <button
            type="button"
            onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
          >
            <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
          </button>

          <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ handleShare }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          {show && <p>Link copied!</p> }
          { recipe.type === 'meal' && (
            <div>
              <p
                data-testid={ `0-${recipe.tags[0]}-horizontal-tag` }
              >
                {recipe.tags[0]}

              </p>
              <p
                data-testid={ `1-${recipe.tags[1]}-horizontal-tag` }
              >
                {recipe.tags[1]}

              </p>
            </div>
          )}
        </div>

      ))}

    </div>
  );
}

export default DoneRecipeCard;
