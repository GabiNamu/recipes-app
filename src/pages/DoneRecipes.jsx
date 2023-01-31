import React, { useContext, useEffect } from 'react';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';
import { Context } from '../context/provider/ApiProvider';

function DoneRecipes() {
  const { setRecipes } = useContext(Context);

  useEffect(() => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      const jsonRecipes = JSON.parse(doneRecipes);
      setRecipes(jsonRecipes);
    }
  }, [setRecipes]);

  const handleClick = (type) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (type === 'meal') {
      const meal = doneRecipes.filter((recipe) => recipe.type === 'meal');
      setRecipes(meal);
      return;
    }
    if (type === 'drink') {
      const drink = doneRecipes.filter((recipe) => recipe.type === 'drink');
      setRecipes(drink);
      return;
    }
    setRecipes(doneRecipes);
  };

  return (
    <div>
      <Header title="Done Recipes" search={ false } />
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
      <DoneRecipeCard />
    </div>
  );
}

export default DoneRecipes;
