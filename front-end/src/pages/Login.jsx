import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [input, setInput] = useState({ email: '', password: '' });

  const history = useHistory();

  const onChangeHandler = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };

  const validateInputs = () => {
    const { email, password } = input;
    let disabled = true;
    const PASSWORD_LENGTH = 6;
    const validator = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const inputValidations = [
      email.length > 0,
      password.length >= PASSWORD_LENGTH,
      validator.test(email),
    ];
    if (inputValidations.every((validation) => validation === true)) {
      disabled = false;
    }
    return disabled;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = input;

    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log(response);
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <span data-testid="common_login__element-invalid-email">aa</span>
        <label htmlFor="email">
          Email:
          <input
            data-testid="common_login__input-email"
            type="text"
            id="email"
            name="email"
            value={ input.email }
            onChange={ onChangeHandler }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            data-testid="common_login__input-password"
            type="text"
            id="password"
            name="password"
            value={ input.password }
            onChange={ onChangeHandler }
          />
        </label>
        <button
          data-testid="common_login__button-login"
          type="submit"
          disabled={ validateInputs() }
        >
          Login
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => history.push('/register') }
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
