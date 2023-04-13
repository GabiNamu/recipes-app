import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ title, search }) {
  const [show, setShow] = useState(false);

  return (
    <div className="header">
      <Link to="/profile">
        <CgProfile className="header-profile-icon" />
      </Link>

      { search === true && (
        <button
          type="button"
          className="header-search-icon-button"
          onClick={ () => setShow(!show) }
        >
          <BiSearchAlt className="header-search-icon" />
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
