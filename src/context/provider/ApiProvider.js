import React, { createContext, useMemo, useState } from 'react';

export const Context = createContext();

function ApiProvider({ children }) {
  const [recipeList, setRecipeList] = useState({});
  const [Recipes, setRecipes] = useState([]);

  const value = useMemo(() => ({
    recipeList, setRecipeList, Recipes, setRecipes }), [recipeList, Recipes]);

  return <Context.Provider value={ value }>{children}</Context.Provider>;
}

ApiProvider.propTypes = {}.isRequired;

export default ApiProvider;
