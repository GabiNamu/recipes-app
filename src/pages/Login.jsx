import React, { useState } from 'react';

function Login({ history }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
    validation: true,
  });

  const handleChange = ({ target: { name, value } }) => {
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = isEmailValid.test(user.email) && user.password.length > Number('5');

    console.log(isValid);
    setUser({
      ...user,
      [name]: value,
      validation: !isValid,
    });
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/meals');
    setUser({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <input
        type="email"
        name="email"
        onChange={ handleChange }
        value={ user.email }
        data-testid="email-input"
      />
      <input
        type="password"
        name="password"
        onChange={ handleChange }
        value={ user.password }
        data-testid="password-input"
      />
      <button
        type="button"
        onClick={ handleClick }
        data-testid="login-submit-btn"
        disabled={ user.validation }
      >
        Enter
      </button>
    </div>
  );
}

Login.propTypes = {}.isRequired;

export default Login;
