import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, CardHeader, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Person from '@mui/icons-material/Person';
import Key from '@mui/icons-material/Key';
import AppContext from '../context/AppContext';
import { createUser } from '../utils/fetchApi';
import CommonButton from '../components/common/CommonButton/CommomButton';
import OutlinedInput from '../components/common/CommonOutlinedInput/CommonOutlinedInput';

function Register() {
  const { user, setUser } = useContext(AppContext);

  const [registerInputs, setRegisterInputs] = React.useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [errorMessage, setErrorMessage] = useState({ isError: false, message: '' });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setRegisterInputs({ ...registerInputs, [name]: value });
    setErrorMessage({
      ...errorMessage,
      isError: false,
      message: '',
    });
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
    return !inputValidations.every((validation) => validation === true);
  };

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
    navigate('/customer/products');
  };

  // const handleSubmitAdmin = async (e) => {
  //   e.preventDefault();
  //   const { token } = user;
  //   const { email, password, name, role } = registerInputs;

  //   const result = await createUserByAdmin(token, { email, password, name, role });
  //   console.log(result);
  //   if (user && user.role === 'administrator' && result.message) {
  //     return setErrorMessage({ isError: true, message: EMAIL_ERROR });
  //   }
  //   if (user && user.role === 'administrator') {
  //     setErrorMessage({ isError: false, message: '' });
  //     setUser({
  //       id,
  //       name,
  //       email,
  //       role,
  //       token: result.token,
  //     });
  //     navigate('/customer/products');
  //   }
  // };

  return (
    <Container sx={ { display: 'flex', justifyContent: 'center', padding: '80px' } }>
      <Card
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          minWidth: '300px',
          padding: '0 20px 20px',
        } }
      >
        <CardHeader
          title="Registrar"
          sx={ { alignSelf: 'center', width: '100%' } }
          action={
            <IconButton
              edge="end"
              onClick={ () => navigate('/login') }
              sx={ { paddingRight: '15px' } }
            >
              <ArrowBackIcon />
            </IconButton>
          }
        />
        <OutlinedInput
          placeholder="Nome"
          name="name"
          type="text"
          value={ registerInputs.name }
          iconStart={ <Person /> }
          sx={ { margin: '5px 0' } }
          error={ errorMessage.isError }
          onChange={ handleChange }
        />
        <OutlinedInput
          placeholder="Email"
          name="email"
          type="email"
          value={ registerInputs.email }
          iconStart={ <EmailIcon /> }
          sx={ { margin: '5px 0' } }
          error={ errorMessage.isError }
          onChange={ handleChange }
        />
        <OutlinedInput
          placeholder="Senha"
          name="password"
          type="password"
          value={ registerInputs.password }
          error={ errorMessage.isError }
          iconStart={ <Key /> }
          iconEnd={ showPassword ? <VisibilityOff /> : <Visibility /> }
          sx={ errorMessage.isError
            ? { margin: '5px 0 0 0' } : { margin: '5px 0 10px 0' } }
          onChange={ handleChange }
          onClick={ handleClickShowPassword }
        />
        {errorMessage.isError && (
          <Typography
            variant="caption"
            display="block"
            color="error"
            sx={ { marginBottom: '10px' } }
          >
            {errorMessage.message}

          </Typography>
        )}
        <CommonButton
          disabled={ validateInputs() }
          onClick={ handleSubmit }
          marginTop="20px"
        >
          Registrar
        </CommonButton>
      </Card>
    </Container>
  );
}

export default Register;
