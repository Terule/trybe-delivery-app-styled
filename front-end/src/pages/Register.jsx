import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createUser } from '../utils/fetchApi';

const ROUTE = 'common_register';
const ELEMENT = 'element-invalid_register';

function Register() {
  const [registerInputs, setRegisterInputs] = React.useState({
    name: '',
    email: '',
    password: '',
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
  }, [registerInputs.name, registerInputs.email, registerInputs.password]); // eslint-disable-line

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = registerInputs;

    const result = await createUser({ email, password, name });
    console.log(result);
    if (result.message) {
      setErrorMessage({ isError: true, message: 'Email já cadastrado' });
    } else {
      setErrorMessage({ isError: false, message: '' });
      history.push('/customer/products');
    }
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        { errorMessage.isError
        && (
          <p data-testid={ `${ROUTE}__${ELEMENT}` }>{ errorMessage.message }</p>
        )}
        <label htmlFor="name">
          Nome:
          <input
            data-testid="common_register__input-name"
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
            data-testid="common_register__input-email"
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
            data-testid="common_register__input-password"
            type="text"
            id="password"
            name="password"
            onChange={ handleChange }
            value={ registerInputs.password }
          />
        </label>
        <button
          data-testid="common_register__button-register"
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
