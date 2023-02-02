import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const clipBoard = require('clipboard-copy');

function ShareRecipeButton() {
  const history = useHistory();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleClick = () => {
    setCopiedLink(false);
    clipBoard(`http://localhost:3000${history.location.pathname}`);
    setCopiedLink(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        id="share-btn"
        onClick={ handleClick }
      >
        <img src={ shareIcon } alt="ShareIcon" />
      </button>
      {
        copiedLink && <p>Link copied!</p>
      }
    </div>
  );
}

export default ShareRecipeButton;
