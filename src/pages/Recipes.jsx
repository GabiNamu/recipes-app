import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { Context } from '../context/provider/ApiProvider';

function Recipes() {
  const history = useHistory();
  const { recipeList, setRecipeList } = useContext(Context);
  const heading = history.location.pathname === '/meals' ? 'Meals' : 'Drinks';
  const recipeObj = heading.toLowerCase();
  useEffect(() => {
    if (Object.keys(recipeList).length === 0) {
      console.log('ok');
      return;
    }
    if (recipeList[recipeObj].length > Number('12')) {
      const newRecipes = recipeList[recipeObj].slice(0, Number('12'));
      console.log(newRecipes);
      setRecipeList({ [recipeObj]: newRecipes });
    }
  }, [recipeList]);
  console.log(recipeList);

  return (
    <div>
      <Header title={ heading } search />
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

export default Recipes;
