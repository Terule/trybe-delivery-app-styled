import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardHeader,
  IconButton,
  Typography,
  Tooltip,
  Select,
  MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Person from '@mui/icons-material/Person';
import Key from '@mui/icons-material/Key';
import OutlinedInput from './common/CommonOutlinedInput/CommonOutlinedInput';
import CommonButton from './common/CommonButton/CommomButton';
import { createUser, createUserByAdmin } from '../utils/fetchApi';
import AppContext from '../context/AppContext';

function RegisterForm() {
  const { user, setUser } = useContext(AppContext);

  const [registerInputs, setRegisterInputs] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [errorMessage, setErrorMessage] = useState({ isError: false, message: '' });
  const [showPassword, setShowPassword] = useState(false);

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
    if (result.message) {
      setErrorMessage({ isError: true, message: 'Email já cadastrado' });
    } else {
      setErrorMessage({ isError: false, message: '' });
      setUser({
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        token: result.token,
      });
      navigate('/customer/products');
    }
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    const { token } = user;
    const { email, password, name, role } = registerInputs;

    const result = await createUserByAdmin(token, { email, password, name, role });
    if (user && user.role === 'administrator' && result.message) {
      return setErrorMessage({ isError: true, message: 'Email já cadastrado' });
    }
    if (user && user.role === 'administrator') {
      setErrorMessage({ isError: false, message: '' });
      setUser({
        id: result.user.id,
        name,
        email,
        role,
        token: result.token,
      });
      navigate('/customer/products');
    }
  };

  return (
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
        action={ user && user.role === 'administrator' ? null : (
          <Tooltip title="Voltar">
            <IconButton
              edge="end"
              onClick={ () => navigate('/login') }
              sx={ { marginRight: '0px' } }
            >
              <ArrowBackIcon tooltip="Voltar" />
            </IconButton>
          </Tooltip>
        ) }
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
        type={ showPassword ? 'text' : 'password' }
        value={ registerInputs.password }
        error={ errorMessage.isError }
        iconStart={ <Key /> }
        iconEnd={ showPassword ? <VisibilityOff /> : <Visibility /> }
        sx={ errorMessage.isError
          ? { margin: '5px 0 0 0' } : { margin: '5px 0 10px 0' } }
        onChange={ handleChange }
        onClick={ handleClickShowPassword }
        onKeyPress={ (e) => e.key === 'Enter' && handleSubmit(e) }
      />
      {user && user.role === 'administrator' && (
        <Select
          size="small"
          name="role"
          value={ registerInputs.role }
          sx={ errorMessage.isError
            ? { margin: '5px 0 0 0' } : { margin: '0 0 10px 0' } }
          onChange={ handleChange }
        >
          <MenuItem value="customer">Cliente</MenuItem>
          <MenuItem value="administrator">Administrador</MenuItem>
          <MenuItem value="seller">Vendedor</MenuItem>
        </Select>
      )}
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
        onClick={ user && user.role === 'Administrator'
          ? handleSubmitAdmin : handleSubmit }
        marginTop="20px"
      >
        Registrar
      </CommonButton>
    </Card>
  );
}

export default RegisterForm;
