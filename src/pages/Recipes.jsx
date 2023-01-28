import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { getRecipes } from '../context/api/mealDB';

function Recipes() {
  const history = useHistory();
  const [categorys, setCategorys] = useState({});
  const heading = history.location.pathname === '/meals' ? 'Meals' : 'Drinks';
  const recipeObj = heading.toLowerCase();

  useEffect(() => {
    const fetchCategorys = async () => {
      if (recipeObj === 'meals') {
        const resultCategorys = await getRecipes('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        console.log(resultCategorys);
        const cat = resultCategorys.meals.slice(0, Number('5'));
        console.log({ meals: cat });
        setCategorys({ meals: cat });
        return;
      }
      const resultCategorys = await getRecipes('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const cat = resultCategorys.drinks.slice(0, Number('5'));
      setCategorys({ drinks: cat });
    };
    fetchCategorys();
  }, []);

  return (
    <div>
      <Header title={ heading } search />
      {Object.keys(categorys).length !== 0 && categorys[recipeObj].map((category) => (
        <button
          type="button"
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
        >
          {category.strCategory}
        </button>
      ))}
      <RecipeCard recipeObj={ recipeObj } />
    </div>
  );
}

export default Recipes;
