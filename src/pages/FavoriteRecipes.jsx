import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header title="Favorite Recipes" search={ false } />
      <h1>Favorites!</h1>
    </div>
  );
}

export default FavoriteRecipes;
