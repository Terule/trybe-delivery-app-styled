import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutList from '../components/CheckoutList';
import CheckoutTable from '../components/CheckoutTable';
import NavBar from '../components/NavBar';
import StatusBar from '../components/StatusBar';
import StatusBarMobile from '../components/StatusBarMobile';
import AppContext from '../context/AppContext';
import { getSaleById, updateSaleStatus } from '../utils/fetchApi';

const getRoute = (role) => {
  if (role === 'customer') {
    return {
      route: 'customer_order_details', element: 'element-order-details',
    };
  }
  return {
    route: 'seller_order_details', element: 'element-order-details',
  };
};

export default function OrderDetails() {
  const [sale, setSale] = useState(undefined);
  const { id } = useParams();
  const { user } = useContext(AppContext);

  const ROUTE = getRoute(user.role).route;

  const remove = () => {
    console.error();
  };

  useEffect(() => {
    const fetchData = async () => {
      const saleData = await getSaleById({ id, token: user.token });
      setSale(saleData);
    };
    fetchData();
  }, []); // eslint-disable-line

  const tableColumns = [
    { head: 'Item' },
    { head: 'Descrição' },
    { head: 'Quantidade' },
    { head: 'Valor Unitário' },
    { head: 'Sub-total' },
  ];

  const handleStatus = async (status) => {
    const result = await updateSaleStatus({ id, status, token: user.token });
    if (result.message) {
      console.error(result.message);
    }
    setSale({ ...sale, status });
  };

  return (
    <Box
      sx={ {
        backgroundColor: '#f8f8f8',
        margin: 0,
        paddingTop: 10,
        paddingBottom: 7,
        minHeight: 750,
      } }
    >
      <NavBar />
      <Container>
        <Typography
          element="h1"
          sx={ {
            fontWeight: 700,
            fontSize: { xs: 25, md: 35 },
            alignSelf: 'center',
            textDecoration: 'none',
            marginBottom: 2,
          } }
        >
          Detalhes do Pedido
        </Typography>
        <Paper
          sx={ { padding: 3 } }
        >
          { sale && (
            <>
              <StatusBar
                sale={ sale }
                user={ user }
                handleStatus={ handleStatus }
              />
              <StatusBarMobile
                sale={ sale }
                user={ user }
                handleStatus={ handleStatus }
              />
            </>
          )}
          { sale && (
            <>
              <CheckoutTable
                tableColumns={ tableColumns }
                cart={ sale.products }
                remove={ remove }
                isCheckout={ false }
                ROUTE={ ROUTE }
                totalValue={ +sale.totalPrice }
              />
              <CheckoutList
                isCheckout={ false }
                products={ sale.products }
                remove={ remove }
              />
            </>
          )}
          <Box
            sx={ {
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: 3,
            } }
          >
            <Typography
              element="div"
              sx={ {
                fontSize: { xs: 25, md: 35 },
                marginRight: 3,
              } }
            >
              Total
            </Typography>
            <Typography
              element="div"
              sx={ {
                fontSize: { xs: 25, md: 35 },
                textDecoration: 'none',
              } }
            >
              { sale && `R$ ${sale.totalPrice.replace('.', ',')}` }
            </Typography>
          </Box>
        </Paper>
        <Box>
          <Typography
            element="h1"
            sx={ {
              fontWeight: 700,
              fontSize: { xs: 25, md: 35 },
              alignSelf: 'center',
              textDecoration: 'none',
              marginBottom: 2,
              marginTop: 2,
            } }
          >
            Endereço de Entrega
          </Typography>
          <Paper
            sx={ { padding: 3 } }
          >
            <Typography
              sx={ {
                fontSize: { xs: 20, md: 20 },
                textDecoration: 'none',
              } }
            >
              { 'Rua: ' }
              { sale && sale.deliveryAddress }
            </Typography>
            <Typography
              sx={ {
                fontSize: { xs: 20, md: 20 },
                textDecoration: 'none',
              } }
            >
              { 'Número: ' }
              { sale && sale.deliveryNumber }
            </Typography>

          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
