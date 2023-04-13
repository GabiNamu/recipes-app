import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdFastfood } from 'react-icons/md';
import { BiDrink } from 'react-icons/bi';
import { GiMeal } from 'react-icons/gi';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';
import { Context } from '../context/provider/ApiProvider';
import '../styles/DoneRecipes.css';

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
      <div className="doneRecipes-container-links">
        <Link to="/meals" className="doneRecipes-link">Meals</Link>
        <Link to="/drinks" className="doneRecipes-link">Drinks</Link>
      </div>
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
      <DoneRecipeCard />
    </div>
  );
}

export default DoneRecipes;
