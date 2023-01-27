import React from 'react';
import { useHistory } from 'react-router-dom';

function RecipeInProgress() {
  const history = useHistory();
  console.log(history.location.pathname);
  return (
    <>
      <h1>RecipeInProgress</h1>
      <div>
        <img src="" alt="" />
      </div>
    </>
  );
}

export default RecipeInProgress;
