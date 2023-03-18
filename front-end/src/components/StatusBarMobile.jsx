import { Box, Button, Chip, Typography } from '@mui/material';
import React from 'react';
import { shape, func } from 'prop-types';

function StatusBarMobile({ sale, user, handleStatus }) {
  const EM_TRANSITO = 'Em Trânsito';

  const getDate = (ISODate) => {
    const SLICE = -2;
    const date = new Date(ISODate);
    return `${(`0${date.getDate()}`).slice(SLICE)}/${
      (`0${date.getMonth() + 1}`).slice(SLICE)}/${
      date.getFullYear()}`;
  };
  const defineColor = (status) => {
    switch (status) {
    case 'Preparando':
      return 'warning';
    case EM_TRANSITO:
      return 'info';
    case 'Entregue':
      return 'success';
    default:
      return 'error';
    }
  };

  const defineIsDisabled = (status) => {
    if (user.role === 'customer') {
      return status !== EM_TRANSITO;
    }
    if (user.role === 'seller') {
      switch (status) {
      case 'Pendente':
        return false;
      case 'Preparando':
        return false;
      default:
        return true;
      }
    }
  };

  const buttonState = () => {
    if (user.role === 'customer' && sale.status === EM_TRANSITO) return true;
    if (user.role === 'seller') {
      switch (sale.status) {
      case 'Pendente':
        return true;
      case 'Preparando':
        return true;
      default:
        return false;
      }
    }
  };
  return (
    <Box
      sx={ {
        display: { xs: 'flex', lg: 'none' },
        width: 'px',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 2,
      } }
    >
      <Box
        sx={ {
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        } }
      >
        <Typography sx={ { fontWeight: 600, fontSize: { xs: 16, lg: 18 } } }>
          Pedido:
          <Typography
            component="span"
            sx={ { fontWeight: 200, fontSize: { xs: 16, lg: 18 } } }
          >
            {` #${sale.id}`}
          </Typography>
        </Typography>
        <Typography
          component="span"
          sx={ { fontWeight: 200, fontSize: { xs: 16, lg: 18 } } }
        >
          {` ${getDate(sale.saleDate)}`}
        </Typography>
        <Chip
          size="small"
          label={ sale.status }
          color={ defineColor(sale.status) }
          sx={ { width: 120 } }
        />
      </Box>
      { buttonState() && (
        <Button
          variant="contained"
          size="large"
          disabled={ defineIsDisabled(sale.status) }
          onClick={ () => {
            if (user.role === 'customer') {
              handleStatus('Entregue');
            }
            if (user.role === 'seller') {
              switch (sale.status) {
              case 'Pendente':
                handleStatus('Preparando');
                break;
              case 'Preparando':
                handleStatus(EM_TRANSITO);
                break;
              default:
                break;
              }
            }
          } }
          sx={ {
            position: 'fixed',
            zIndex: 1,
            bottom: 15,
            right: 15,
          } }
        >
          { user.role === 'customer' && 'Marcar como entregue'}
          { user.role === 'seller' && sale.status === 'Pendente' && 'preparar pedido'}
          { user.role === 'seller' && sale.status === 'Preparando' && 'saiu para entrega'}
        </Button>
      ) }
    </Box>
  );
}

StatusBarMobile.propTypes = {
  sale: shape().isRequired,
  handleStatus: func.isRequired,
  user: shape().isRequired,
};

export default StatusBarMobile;
