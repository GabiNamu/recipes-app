import React, { useContext, useEffect } from 'react';
import { getRecipes } from '../context/api/mealDB';
import { Context } from '../context/provider/ApiProvider';

function RecipeCard({ recipeObj }) {
  const { recipeList, setRecipeList } = useContext(Context);
  useEffect(() => {
    if (Object.keys(recipeList).length !== 0
      && recipeList[recipeObj].length > Number('12')) {
      const newRecipes = recipeList[recipeObj].slice(0, Number('12'));
      console.log(newRecipes);
      setRecipeList({ [recipeObj]: newRecipes });
    }
  }, [recipeList]);

  useEffect(() => {
    const fetchRecipes = async () => {
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
    fetchRecipes();
  }, []);

  return (
    <div>
      <ul>
        {
          Object.keys(recipeList).length !== 0 && recipeList[recipeObj]
            .map((recipe, index) => (
              <li
                key={ recipeObj === 'meals' ? recipe.idMeal : recipe.idDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <p data-testid={ `${index}-card-name` }>
                  {recipeObj === 'meals'
                    ? recipe.strMeal : recipe.strDrink }

                </p>
                <img
                  src={ recipeObj === 'meals'
                    ? recipe.strMealThumb : recipe.strDrinkThumb }
                  alt={ recipeObj === 'meals' ? recipe.strMeal : recipe.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </li>
            ))
        }
      </ul>
    </div>
  );
}

RecipeCard.propTypes = {}.isRequired;

export default RecipeCard;
