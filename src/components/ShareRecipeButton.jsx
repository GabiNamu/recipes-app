import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareRecipeButton() {
  return (
    <button
      type="button"
      data-testid="share-btn"
    >
      <img src={ shareIcon } alt="ShareIcon" />
    </button>
  );
}

export default ShareRecipeButton;
