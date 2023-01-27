import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function Recipes() {
  const history = useHistory();
  const heading = history.location.pathname === '/meals' ? 'Meals' : 'Drinks';
  const recipeObj = heading.toLowerCase();

  return (
    <div>
      <Header title={ heading } search />
      <RecipeCard recipeObj={ recipeObj } />
    </div>
  );
}

export default Recipes;
