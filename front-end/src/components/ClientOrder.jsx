import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Typography,
  IconButton,
  CardActions,
  Collapse,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody } from '@mui/material';

const getRoute = (isSeller) => {
  if (!isSeller) {
    return {
      route: 'customer_orders_',
    };
  }
  return {
    route: 'seller_orders_',
  };
};

const CARD_ORDER = '_element-order-id-';
const CARD_DATE = '_element-order-date-';
const CARD_PRICE = '_element-card-price-';
const SPACE = 'space-between';
const EM_TRANSITO = 'Em Trânsito';

function ClientOrder({
  order, status, price, date, address, isSeller, number, user, products,
}) {
  const [show, setShow] = useState(false);

  const defineColor = (statusString) => {
    switch (statusString) {
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

  const navigate = useNavigate();
  const ROUTE = getRoute(isSeller).route;
  return (
    <Grid item lg={ 4 } sm={ 6 } xs={ 12 }>
      <Card sx={ { display: 'flex', flexDirection: 'column' } }>
        <Box sx={ { display: 'flex' } }>
          <CardActionArea
            onClick={ () => navigate(isSeller
              ? `/seller/orders/${order}` : `/customer/orders/${order}`) }
          >
            {order && (
              <CardContent>
                <Box
                  sx={ {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: SPACE,
                  } }
                >
                  <Typography
                    data-testid={ `${ROUTE}${CARD_ORDER}${order}` }
                    variant="h6"
                  >
                    {`Pedido: #${order}`}
                  </Typography>
                  <Chip size="small" label={ status } color={ defineColor(status) } />
                </Box>
                <Box
                  sx={ {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: SPACE,
                    marginTop: 1,
                  } }
                >
                  <Typography
                    data-testid={ `${ROUTE}${CARD_DATE}${order}` }
                  >
                    {`Data: ${moment(date).format('DD/MM/YYYY')}`}
                  </Typography>
                  <Typography
                    data-testid={ `${ROUTE}${CARD_PRICE}${order}` }
                  >
                    {`Total: R$ ${price.replace('.', ',')}`}
                  </Typography>
                </Box>

              </CardContent>
            )}
          </CardActionArea>
          { isSeller && (
            <CardActions>
              <IconButton
                sx={ {
                  transform: show ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                } }
                onClick={ () => setShow((s) => !s) }
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          )}
        </Box>
        <Collapse
          in={ show }
          sx={ {
            paddingRight: 2, paddingLeft: 2, paddingBottom: show ? 2 : 0 } }
        >
          <Box
            sx={ {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: SPACE,
              marginTop: 1,
            } }
          >
            <Typography>
              {`Cliente: ${user.name}`}
            </Typography>
            {show && (
              <Box
                sx={ {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: SPACE,
                  marginTop: 1,
                } }
              >
                <Typography>
                  {`Endereço: ${address}`}
                </Typography>
                <Typography>
                  {`Nº: ${number}`}
                </Typography>
              </Box>
            )}
            {show && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ITEM</TableCell>
                    <TableCell align="right">QTD</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((item, index) => (
                    <TableRow key={ index }>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.SaleProduct.quantity}</TableCell>
                    </TableRow>))}
                </TableBody>
              </Table>
            )}
          </Box>
        </Collapse>
      </Card>
    </Grid>
  );
}

export default ClientOrder;

ClientOrder.propTypes = {
  order: PropTypes.number,
  status: PropTypes.string,
  price: PropTypes.number,
  date: PropTypes.string,
  address: PropTypes.string,
  isSeller: PropTypes.bool,
  number: PropTypes.string,
  user: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}.isRequired;
