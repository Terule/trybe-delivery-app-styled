import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import Person from '@mui/icons-material/Person';
import {
  Button,
  Card,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import AppContext from '../context/AppContext';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { createUser, createUserByAdmin } from '../utils/fetchApi';
import CommonButton from './common/CommonButton/CommomButton';
import OutlinedInput from './common/CommonOutlinedInput/CommonOutlinedInput';

function NewProductForm() {
  const { user, setUser } = useContext(AppContext);

  const [registerInputs, setRegisterInputs] = useState({
    name: '',
    price: '',
    file: '',
  });
  const [errorMessage, setErrorMessage] = useState({ isError: false, message: '' });

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
    const { name, price } = registerInputs;
    const inputValidations = [
      name.length >= 0,
      price.length >= 0,
    ];
    return !inputValidations.every((validation) => validation === true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      email, password, name, role,
    } = registerInputs;

    const result = await createUser({
      email, password, name, role,
    });
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
    const {
      email, password, name, role,
    } = registerInputs;

    const result = await createUserByAdmin(token, {
      email, password, name, role,
    });
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
        sx={{ alignSelf: 'center', width: '100%' }}
        action={ user && user.role === 'administrator' ? null : (
          <Tooltip title="Voltar">
            <IconButton
              edge="end"
              onClick={ () => navigate('/login') }
              sx={{ marginRight: '0px' }}
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
        sx={{ margin: '5px 0' }}
        error={ errorMessage.isError }
        onChange={ handleChange }
      />
      <OutlinedInput
        placeholder="Preço"
        name="price"
        type="text"
        value={ registerInputs.price }
        iconStart={ <EmailIcon /> }
        sx={{ margin: '5px 0' }}
        error={ errorMessage.isError }
        onChange={ handleChange }
      />
      <Button
        variant="outlined"
      >
        <OutlinedInput
          placeholder="Imagem"
          name="file"
          type="file"
          value={ registerInputs.file }
          error={ errorMessage.isError }
          iconStart={ <UploadFileIcon /> }
        // iconEnd={ showPassword ? <VisibilityOff /> : <Visibility /> }
          sx={ errorMessage.isError
            ? { margin: '5px 0 0 0' } : { margin: '5px 0 10px 0' } }
          onChange={ handleChange }
          onKeyPress={ (e) => e.key === 'Enter' && handleSubmit(e) }
        />
      </Button>
      { errorMessage.isError && (
        <Typography
          variant="caption"
          display="block"
          color="error"
          sx={{ marginBottom: '10px' }}
        >
          { errorMessage.message }

        </Typography>
      ) }
      <CommonButton
        disabled={ validateInputs() }
        onClick={ user && user.role === 'Administrator'
          ? handleSubmitAdmin : handleSubmit }
        marginTop="20px"
      >
        Cadastrar
      </CommonButton>
    </Card>
  );
}

export default NewProductForm;
