import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  const email = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div>
      <Header title="Profile" search={ false } />
      <div className="profile-container">
        <p data-testid="profile-email">{email && email.email}</p>
        <Link to="/done-recipes" data-testid="profile-done-btn">
          Done Recipes
        </Link>
        <Link to="/favorite-recipes" data-testid="profile-favorite-btn">
          Favorite Recipes
        </Link>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
