import React from 'react';
import PropTypes from 'prop-types';

function RecomendationsCards({ recipesRecomendations }) {
  return (
    <div className="container">
      <h1 className="subtitle-details">Recommended</h1>
      <div className="carousel">
        {
          recipesRecomendations.map((recipe, index) => (
            <div
              key={ index }
              hidden={ index > 1 }
              data-testid={ `${index}-recommendation-card` }
              className="item card-recommended"
            >
              <img
                className="img-recommended"
                width="100%"
                height="80%"
                src={ recipe.strDrinkThumb || recipe.strMealThumb }
                alt={ `Recipe Recomendation ${index}` }
              />
              <h1
                style={ { color: 'white' } }
                className="title-recommended"
                data-testid={ `${index}-recommendation-title` }
              >
                { recipe.strDrink || recipe.strMeal }

              </h1>
            </div>
          ))
        }
      </div>
    </div>
  );
}

RecomendationsCards.propTypes = {
  recipesRecomendations: PropTypes
    .arrayOf(PropTypes.shape(PropTypes.any.isRequired).isRequired).isRequired,
};

export default RecomendationsCards;
