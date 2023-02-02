import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getRecipes } from '../context/api/mealDB';
import { Context } from '../context/provider/ApiProvider';

function RecipeCard({ recipeObj }) {
  const { recipeList, setRecipeList } = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    if (Object.keys(recipeList).length !== 0
      && recipeList[recipeObj] && recipeList[recipeObj].length > Number('12')) {
      const newRecipes = recipeList[recipeObj].slice(0, Number('12'));
      setRecipeList({ [recipeObj]: newRecipes });
    }
  }, [recipeList, recipeObj, setRecipeList]);

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
  }, [recipeObj, setRecipeList]);
  const handleClick = (id) => {
    history.push(`/${recipeObj}/${id}`);
  };
  return (
    <div>
      <ul>
        {
          Object.keys(recipeList).length !== 0
          && recipeList[recipeObj] ? recipeList[recipeObj]
              .map((recipe, index) => (
                <button
                  style={ { width: '200px' } }
                  key={ recipeObj === 'meals' ? recipe.idMeal : recipe.idDrink }
                  onClick={ () => handleClick(recipeObj === 'meals'
                    ? recipe.idMeal : recipe.idDrink) }
                >
                  <li
                    data-testid={ `${index}-recipe-card` }
                  >
                    <p data-testid={ `${index}-card-name` }>
                      {recipeObj === 'meals'
                        ? recipe.strMeal : recipe.strDrink }

                    </p>
                    <img
                      style={ { width: '150px' } }
                      src={ recipeObj === 'meals'
                        ? recipe.strMealThumb : recipe.strDrinkThumb }
                      alt={ recipeObj === 'meals' ? recipe.strMeal : recipe.strDrink }
                      data-testid={ `${index}-card-img` }
                    />
                  </li>
                </button>
              )) : ''
        }
      </ul>
    </div>
  );
}

RecipeCard.propTypes = {}.isRequired;

export default RecipeCard;
