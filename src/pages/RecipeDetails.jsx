import React from 'react';
import { useHistory } from 'react-router-dom';

function RecipeDetails() {
  const history = useHistory();
  const handleClick = () => {
    history.push(`${history.location.pathname}/in-progress`);
  };

  return (
    <div>
      <button onClick={ handleClick }>send url</button>
    </div>
  );
}

export default RecipeDetails;
