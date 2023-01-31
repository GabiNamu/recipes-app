import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeDetailsInterface from '../components/RecipeDetailsInterface';

function RecipeDetails({ match: { path, params: { id } } }) {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <RecipeDetailsInterface props={ [loading, setLoading, path, id] } />
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};

export default RecipeDetails;
