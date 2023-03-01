import React from 'react';

function Register() {
  const [registerInputs, setRegisterInputs] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setRegisterInputs({ ...registerInputs, [name]: value });
  };

  const validateInputs = () => {
    const { name, email, password } = registerInputs;
    let disabled = true;
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
      disabled = false;
    }
    return disabled;
  };

  return (
    <div>
      <form>
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
          type="button"
          disabled={ validateInputs() }
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
