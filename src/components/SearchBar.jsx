import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getMealByCategory } from '../context/api/mealDB';
import { getCocktailByCategory } from '../context/api/cocktailDB';
import { Context } from '../context/provider/ApiProvider';
import '../styles/Header.css';

function SearchBar() {
  const [search, setSearch] = useState({ radio: '', inputText: '' });
  const { setRecipeList } = useContext(Context);
  const history = useHistory();
  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    if (history.location.pathname === '/meals') {
      const resultMeals = await getMealByCategory(
        search.inputText,
        search.radio,
      );
      setRecipeList(resultMeals);
      if (resultMeals.meals === null) {
        setRecipeList({});
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (resultMeals && resultMeals.meals.length === 1) {
        history.push(`/meals/${resultMeals.meals[0].idMeal}`);
      }
      return;
    }
    const resultDrinks = await getCocktailByCategory(
      search.inputText,
      search.radio,
    );
    setRecipeList(resultDrinks);
    if (resultDrinks.drinks === null) {
      setRecipeList({});
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (resultDrinks && resultDrinks.drinks.length === 1) {
      history.push(`/drinks/${resultDrinks.drinks[0].idDrink}`);
    }
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          name="inputText"
          data-testid="search-input"
          onChange={ (e) => handleChange(e) }
        />
      </div>
      <div className="search-container">
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            name="radio"
            id="ingredient"
            value="ingredient"
            onChange={ (e) => handleChange(e) }
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            name="radio"
            id="name"
            value="name"
            onChange={ (e) => handleChange(e) }
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter">
          First Letter
          <input
            type="radio"
            name="radio"
            id="first-letter"
            value="first-letter"
            onChange={ (e) => handleChange(e) }
            data-testid="first-letter-search-radio"
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
    </>
  );
}

export default SearchBar;
