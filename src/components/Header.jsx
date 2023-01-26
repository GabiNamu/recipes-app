import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, search }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="Ícone de perfil"
          data-testid="profile-top-btn"
        />
      </Link>

      { search === true && (
        <button type="button" onClick={ () => setShow(!show) }>
          <img src={ searchIcon } alt="Ícone de pesquisa" data-testid="search-top-btn" />
        </button>)}

      <h2 data-testid="page-title">{ title }</h2>
      {show && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
