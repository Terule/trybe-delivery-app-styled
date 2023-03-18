import { Container } from '@mui/material';
import React from 'react';
import RegisterForm from '../components/RegisterForm';

function Register() {
  return (
    <Container
      sx={ {
        display: 'flex',
        justifyContent: 'center',
        padding: '80px' } }
    >
      <RegisterForm />
    </Container>
  );
}

export default Register;
