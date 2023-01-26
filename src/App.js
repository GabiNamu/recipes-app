import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import Recipe from './pages/Recipe';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/meals/:id-da-receita" component={ Recipe } />
      <Route
        exact
        path="/meals/:id-da-receita/in-progress"
        component={ RecipeInProgress }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id-da-receita" component={ Recipe } />
      <Route
        exact
        path="/drinks/:id-da-receita/in-progress"
        component={ RecipeInProgress }
      />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
    </Switch>
  );
}

export default App;
