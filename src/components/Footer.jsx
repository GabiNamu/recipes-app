import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/drinks">
        <button type="button">
          <img
            src={ drinkIcon }
            alt="Ícone de drink"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>

      <Link to="/meals">
        <button type="button">
          <img
            src={ mealIcon }
            alt="Ícone de comidas"
            data-testid="meals-bottom-btn"
          />
        </button>
      </Link>
    </div>
  );
}
Footer.propTypes = {}.isRequired;

export default Footer;
