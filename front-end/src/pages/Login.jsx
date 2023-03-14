import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { userLogin } from '../utils/fetchApi';

const ROUTE = 'common_login';
const ELEMENT = 'element-invalid-email';

function Login() {
  const { user, setUser } = useContext(AppContext);
  const [input, setInput] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState({ isError: false, message: '' });

  const history = useHistory();

  useEffect(() => {
    const loggedIn = async () => {
      /* const logged = JSON.parse(localStorage.getItem('user')); */
      if (user) {
        switch (user.role) {
        case 'customer':
          history.push('/customer/products');
          break;
        case 'seller':
          history.push('/seller/orders');
          break;
        case 'administrator':
          history.push('/admin/manage');
          break;
        default:
          history.push('/login');
        }
      }
    };
    loggedIn();
  }, []);

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

    const result = await userLogin({ email, password });
    if (result.message) {
      setErrorMessage({ isError: true, message: 'Usuário e/ou senha incorretos' });
    } else {
      const { name, role, id } = result.user;
      setErrorMessage({ isError: false, message: '' });
      setUser({
        id,
        name,
        email,
        role,
        token: result.token,
      });
      if (result.user.role === 'customer') history.push('/customer/products');
      if (result.user.role === 'seller') history.push('/seller/orders');
      if (result.user.role === 'administrator') history.push('/admin/manage');
    }
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        { errorMessage.isError
        && (
          <p data-testid={ `${ROUTE}__${ELEMENT}` }>{ errorMessage.message }</p>
        )}
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
