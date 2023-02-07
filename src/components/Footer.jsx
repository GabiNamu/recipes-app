import React from 'react';
import { RiRestaurant2Line } from 'react-icons/ri';
import { BiDrink } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/meals">
        <RiRestaurant2Line />
      </Link>
      <Link to="/drinks">
        <BiDrink />
      </Link>
    </div>
  );
}
Footer.propTypes = {}.isRequired;

export default Footer;
