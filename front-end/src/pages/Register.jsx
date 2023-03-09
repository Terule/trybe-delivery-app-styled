import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { createUser, createUserByAdmin } from '../utils/fetchApi';

const EMAIL_ERROR = 'Email já cadastrado';

function Register() {
  const { user, setUser } = useContext(AppContext);

  const [registerInputs, setRegisterInputs] = React.useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState({ isError: false, message: '' });

  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setRegisterInputs({ ...registerInputs, [name]: value });
  };

  const validateInputs = () => {
    const { name, email, password } = registerInputs;
    const PASSWORD_LENGTH = 6;
    const NAME_LENGTH = 12;
    const validator = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const inputValidations = [
      name.length >= NAME_LENGTH,
      email.length > 0,
      password.length >= PASSWORD_LENGTH,
      validator.test(email),
    ];
    if (inputValidations.every((validation) => validation === true)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    validateInputs();
  }, [registerInputs.name,
    registerInputs.email,
    registerInputs.password,
    registerInputs.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name, role } = registerInputs;

    const result = await createUser({ email, password, name, role });
    console.log(result);
    if (result.message) {
      return setErrorMessage({ isError: true, message: EMAIL_ERROR });
    }
    setUser({
      name,
      email,
      role,
      token: result.token,
    });
    console.log(user);
    setErrorMessage({ isError: false, message: '' });
    history.push('/customer/products');
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    const { token } = user;
    const { email, password, name, role } = registerInputs;

    const result = await createUserByAdmin(token, { email, password, name, role });
    console.log(result);
    if (user && user.role === 'administrator' && result.message) {
      return setErrorMessage({ isError: true, message: EMAIL_ERROR });
    }
    if (user && user.role === 'administrator') {
      setErrorMessage({ isError: false, message: '' });
      setRegisterInputs({
        name: '',
        email: '',
        password: '',
        role: 'customer',
      });
    }
  };

  const getRoute = (role) => {
    if (user && role.role === 'administrator') {
      return {
        route: 'admin_manage', element: 'element-invalid-register',
      };
    }
    return {
      route: 'common_register', element: 'element-invalid_register',
    };
  };

  const ROUTE = getRoute(user).route;
  const ELEMENT = getRoute(user).element;

  return (
    <div>
      <form
        onSubmit={
          user && user.role === 'administrator' ? handleSubmitAdmin : handleSubmit
        }
      >
        { errorMessage.isError
        && (
          <p data-testid={ `${ROUTE}__${ELEMENT}` }>{ errorMessage.message }</p>
        )}
        <label htmlFor="name">
          Nome:
          <input
            data-testid={ `${ROUTE}__input-name` }
            type="text"
            id="name"
            name="name"
            onChange={ handleChange }
            value={ registerInputs.name }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid={ `${ROUTE}__input-email` }
            type="text"
            id="email"
            name="email"
            onChange={ handleChange }
            value={ registerInputs.email }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            data-testid={ `${ROUTE}__input-password` }
            type="text"
            id="password"
            name="password"
            onChange={ handleChange }
            value={ registerInputs.password }
          />
        </label>

        { user && user.role === 'administrator' && (
          <label htmlFor="type">
            <select
              name="admin_manage__select-role"
              data-testid="admin_manage__select-role"
              value={ registerInputs.role }
              onChange={ ({ target: { value } }) => setRegisterInputs(
                (prevSelect) => ({ ...prevSelect, role: value }),
              ) }
            >
              <option value="customer">Cliente</option>
              <option value="seller">Vendedor</option>
            </select>
          </label>
        )}

        <button
          data-testid={ `${ROUTE}__button-register` }
          type="submit"
          disabled={ disabled }
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
