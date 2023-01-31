import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import { getRecipes } from '../context/api/mealDB';
import { Context } from '../context/provider/ApiProvider';

function Recipes() {
  const history = useHistory();
  const { setRecipeList } = useContext(Context);
  const [dobleClick, setDobleClick] = useState({ name: '' });
  const [categorys, setCategorys] = useState({});
  const heading = history.location.pathname === '/meals' ? 'Meals' : 'Drinks';
  const recipeObj = heading.toLowerCase();
  console.log(categorys);
  useEffect(() => {
    const fetchCategorys = async () => {
      if (recipeObj === 'meals') {
        console.log(recipeObj);
        const resultCategorys = await getRecipes('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const cat = resultCategorys.meals.slice(0, Number('5'));
        setCategorys({ meals: cat });
        return;
      }
      const resultCategorys = await getRecipes('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const cat = resultCategorys.drinks.slice(0, Number('5'));
      setCategorys({ drinks: cat });
    };
    fetchCategorys();
  }, [recipeObj]);

  const handleClickCategory = async (e) => {
    if (recipeObj === 'meals') {
      if (dobleClick.name === e.target.id) {
        const resultMeals = await getRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecipeList(resultMeals);
        setDobleClick({ name: '' });
        return;
      }
      const result = await getRecipes(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.id}`);
      setRecipeList(result);
      console.log(dobleClick.name);
      console.log(e.target.id);
      setDobleClick({ name: e.target.id });
    }
    if (recipeObj === 'drinks') {
      if (dobleClick.name === e.target.id) {
        const resultDrinks = await getRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setRecipeList(resultDrinks);
        setDobleClick({ name: '' });
        return;
      }
      const result = await getRecipes(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e.target.id}`);
      setRecipeList(result);
      setDobleClick({ name: e.target.id });
    }
  };

  const handleClickAll = async () => {
    if (recipeObj === 'meals') {
      const resultMeals = await getRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRecipeList(resultMeals);
      return;
    }
    if (recipeObj === 'drinks') {
      const resultDrinks = await getRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setRecipeList(resultDrinks);
    }
  };

  return (
    <div>
      <Header title={ heading } search />
      <Footer />
      {Object.keys(categorys).length !== 0
      && categorys[recipeObj]
        ? categorys[recipeObj].map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            id={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ handleClickCategory }
          >
            {category.strCategory}
          </button>
        )) : '' }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickAll }
      >
        All

      </button>
      <RecipeCard recipeObj={ recipeObj } />
    </div>
  );
}

export default Recipes;
