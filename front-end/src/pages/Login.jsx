import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Container,
  Typography,
  Link,
  CardMedia,
  CardHeader,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Key from '@mui/icons-material/Key';
import AppContext from '../context/AppContext';
import { userLogin } from '../utils/fetchApi';
import logo from '../assets/beer_logo.svg';

import CommonButton from '../components/common/CommonButton/CommomButton';
import OutlinedInput from '../components/common/CommonOutlinedInput/CommonOutlinedInput';

function Login() {
  const { user, setUser } = useContext(AppContext);
  const [input, setInput] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState({ isError: false, message: '' });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = async () => {
      /* const logged = JSON.parse(localStorage.getItem('user')); */
      if (user) {
        switch (user.role) {
        case 'customer':
          navigate('/customer/products');
          break;
        case 'seller':
          navigate('/seller/orders');
          break;
        case 'administrator':
          navigate('/admin/manage');
          break;
        default:
          navigate('/login');
        }
      }
    };
    loggedIn();
  }, []); // eslint-disable-line

  const onChangeHandler = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
    setErrorMessage({
      ...errorMessage,
      isError: false,
      message: '',
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
      if (result.user.role === 'customer') navigate('/customer/products');
      if (result.user.role === 'seller') navigate('/seller/orders');
      if (result.user.role === 'administrator') navigate('/admin/manage');
    }
  };

  return (
    <Container
      sx={ {
        display: 'flex',
        justifyContent: 'center',
        padding: '80px 0 0 0' } }
    >
      <Card
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          minWidth: '300px',
          padding: '20px',
        } }
      >
        <CardMedia
          component="img"
          image={ logo }
          width="150px"
          sx={ { alignSelf: 'center' } }
        />
        <CardHeader
          title="Entrar"
          sx={ { alignSelf: 'center' } }
        />
        <OutlinedInput
          onChange={ onChangeHandler }
          value={ input.email }
          name="email"
          type="email"
          error={ errorMessage.isError }
          sx={ { margin: '5px 0' } }
          iconStart={ <EmailIcon /> }
          placeholder="Email"
          size="small"
        />
        <OutlinedInput
          onChange={ onChangeHandler }
          value={ input.password }
          name="password"
          type={ showPassword ? 'text' : 'password' }
          error={ errorMessage.isError }
          sx={ errorMessage.isError
            ? { margin: '5px 0 0 0' } : { margin: '5px 0 10px 0' } }
          iconStart={ <Key /> }
          iconEnd={ showPassword ? <VisibilityOff /> : <Visibility /> }
          onClick={ handleClickShowPassword }
          placeholder="Senha"
          size="small"

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
          Entrar
        </CommonButton>
        <Typography
          variant="caption"
          display="block"
          sx={ { alignSelf: 'center', marginTop: '10px' } }
        >
          Ainda não é cliente?
          {' '}
          <Link rel="noreferrer" href="/register">Cadastre-se aqui</Link>
        </Typography>
      </Card>
    </Container>
  );
}

export default Login;
