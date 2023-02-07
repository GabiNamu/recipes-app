import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsFillShareFill } from 'react-icons/bs';
import '../styles/RecipeDetails.css';

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
        <BsFillShareFill className="icon-details share" />
      </button>
      {
        copiedLink && <p>Link copied!</p>
      }
    </div>
  );
}

export default ShareRecipeButton;
