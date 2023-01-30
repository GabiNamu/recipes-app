import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/provider/ApiProvider';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard() {
  const history = useHistory();
  const { Recipes } = useContext(Context);
  return (
    <div>
      {Recipes.length !== 0 && Recipes.map((recipe, index) => (
        <div key={ index }>
          <button type="button" onClick={ () => history.push(`/drinks/${recipe.id}`) }>
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
          <button type="button" onClick={ () => history.push(`/drinks/${recipe.id}`) }>
            <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
          </button>

          <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            { shareIcon }
          </button>
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
