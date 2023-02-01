import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MealDetailsInterface from '../components/MealDetailsInterface';
import DrinkDetailsInterface from '../components/DrinkDetailsInterface';

function RecipeDetails({ match: { path, params: { id } } }) {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {
        path.includes('meals')
          ? <MealDetailsInterface props={ [loading, setLoading, id] } />
          : <DrinkDetailsInterface props={ [loading, setLoading, id] } />
      }
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};

export default RecipeDetails;
