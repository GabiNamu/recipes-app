import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route path="/meals/:id" component={ RecipeDetails } />
      <Route
        path="/meals/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route
        path="/drinks/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
    </Switch>
  );
}

export default App;
