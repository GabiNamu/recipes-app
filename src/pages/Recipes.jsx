import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes() {
  const history = useHistory();
  const heading = history.location.pathname === '/meals' ? 'Meals' : 'Drinks';

  return (
    <div>
      <Header title={ heading } search />
      <Footer />
    </div>
  );
}

export default Recipes;
