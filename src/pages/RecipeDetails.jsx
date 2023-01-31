import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeDetailsInterface from '../components/RecipeDetailsInterface';

function RecipeDetails({ history, match: { path, params: { id } } }) {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <RecipeDetailsInterface props={ [loading, setLoading, path, id, history] } />
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape(PropTypes.any.isRequired).isRequired,
  history: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};

export default RecipeDetails;
