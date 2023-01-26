export const getCocktailByCategory = async (text, radio) => {
  let url;
  if (radio === 'ingredient') {
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`;
  }
  if (radio === 'name') {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`;
  }
  if (radio === 'first-letter') {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`;
    if (text.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
};
