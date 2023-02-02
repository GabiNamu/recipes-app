import React, { useContext, useEffect } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import { Context } from '../context/provider/ApiProvider';

function FavoriteRecipes() {
  const { setRecipes } = useContext(Context);

  useEffect(() => {
    const favorites = localStorage.getItem('favoriteRecipes');
    if (favorites) {
      const jsonRecipes = JSON.parse(favorites);
      setRecipes(jsonRecipes);
    }
  }, [setRecipes]);

  const handleClick = (type) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (type === 'meal') {
      const meal = favorites.filter((recipe) => recipe.type === 'meal');
      setRecipes(meal);
      return;
    }
    if (type === 'drink') {
      const drink = favorites.filter((recipe) => recipe.type === 'drink');
      setRecipes(drink);
      return;
    }
    setRecipes(favorites);
  };
  return (
    <div>
      <Header title="Favorite Recipes" search={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleClick('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => handleClick('meal') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleClick('drink') }
      >
        Drinks
      </button>
      <FavoriteCard />
    </div>
  );
}

export default FavoriteRecipes;
