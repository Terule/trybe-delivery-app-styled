import { Box, Button, Chip, Typography } from '@mui/material';
import React from 'react';
import { shape, func } from 'prop-types';

function StatusBar({ sale, user, handleStatus }) {
  const getDate = (ISODate) => {
    const SLICE = -2;
    const date = new Date(ISODate);
    return `${(`0${date.getDate()}`).slice(SLICE)}/${
      (`0${date.getMonth() + 1}`).slice(SLICE)}/${
      date.getFullYear()}`;
  };

  const EM_TRANSITO = 'Em Trânsito';

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

  return (
    <Box
      sx={ {
        display: { xs: 'none', lg: 'flex' },
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 3,
      } }
    >
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 1,
        } }
      >
        <Typography sx={ { fontSize: { xs: 14, lg: 18 } } }>
          {sale && 'PEDIDO'}
        </Typography>

        <Typography sx={ { fontSize: { xs: 14, lg: 18 } } }>
          {sale && `#${sale.id}`}
        </Typography>
      </Box>

      { sale && user.role === 'customer' ? (
        <Box
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 1,
          } }
        >
          <Typography sx={ { fontSize: { xs: 14, lg: 18 } } }>
            {sale && 'VENDEDOR(A)'}
          </Typography>

          <Typography sx={ { xs: 14, lg: 18 } }>
            {sale && `${sale.seller.name}`}
          </Typography>
        </Box>
      ) : null }

      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 1,
        } }
      >
        <Typography sx={ { fontSize: { xs: 14, lg: 18 } } }>
          {sale && 'DATA DA VENDA'}
        </Typography>

        <Typography sx={ { fontSize: { xs: 14, lg: 18 } } }>
          {sale && getDate(sale.saleDate)}
        </Typography>
      </Box>
      <Chip
        label={ sale && sale.status }
        color={ defineColor(sale.status) }
        size="small"
        sx={ { width: 130, fontSize: { xs: 14, lg: 14 } } }
      />
      { sale && user.role === 'seller' ? (
        <>
          <Button
            type="button"
            variant="contained"
            disabled={ sale.status !== 'Pendente' }
            onClick={ () => handleStatus('Preparando') }
          >
            preparar pedido
          </Button>
          <Button
            type="button"
            variant="contained"
            disabled={ sale.status !== 'Preparando' }
            onClick={ () => handleStatus(EM_TRANSITO) }
          >
            saiu para entrega
          </Button>
        </>) : null}
      { sale && user.role === 'customer' ? (
        <Button
          type="button"
          variant="contained"
          disabled={ sale.status !== EM_TRANSITO }
          onClick={ () => handleStatus('Entregue') }
        >
          Marcar como entregue
        </Button>) : null}
    </Box>
  );
}

StatusBar.propTypes = {
  user: shape().isRequired,
  sale: shape().isRequired,
  handleStatus: func.isRequired,
};

export default StatusBar;
