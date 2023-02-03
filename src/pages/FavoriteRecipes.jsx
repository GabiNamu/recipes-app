import React, { useContext, useEffect } from 'react';
import { MdFastfood } from 'react-icons/md';
import { BiDrink } from 'react-icons/bi';
import { GiMeal } from 'react-icons/gi';
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
      <div className="container-button-done-favorites">
        <button
          type="button"
          className="button-done-favorites"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClick('all') }
        >
          <MdFastfood className="icon-done-favorites" />
          <p className="button-name-done-favorites">All</p>
        </button>
        <button
          type="button"
          className="button-done-favorites"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleClick('meal') }
        >
          <GiMeal className="icon-done-favorites" />
          <p className="button-name-done-favorites">Meals</p>
        </button>
        <button
          type="button"
          className="button-done-favorites"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClick('drink') }
        >
          <BiDrink className="icon-done-favorites" />
          <p className="button-name-done-favorites">Drinks</p>
        </button>
      </div>
      <FavoriteCard />
    </div>
  );
}

export default FavoriteRecipes;
