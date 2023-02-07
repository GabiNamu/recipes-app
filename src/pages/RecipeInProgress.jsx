import React from 'react';
import { useHistory } from 'react-router-dom';
import DrinkInProgress from '../components/DrinkInProgress';
import MealInProgress from '../components/MealInProgress';

function RecipeInProgress() {
  const history = useHistory();
  const thisPath = history.location.pathname;
  const productId = thisPath.split('/')[2];
  return (
    <>
      <h2 style={ { textAlign: 'center', marginTop: '1rem' } }>Recipe in Progress</h2>
      <div>
        {thisPath.includes('meals') ? (
          // render meal in progress in case of route containing meals //
          <MealInProgress
            productId={ productId }
          />
        ) : (
          // render drink in progress in case of route containing meals //
          <DrinkInProgress
            productId={ productId }
          />
        )}
      </div>
    </>
  );
}

export default RecipeInProgress;
