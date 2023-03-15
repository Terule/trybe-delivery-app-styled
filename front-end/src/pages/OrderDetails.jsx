import { Box, Container, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutTable from '../components/CheckoutTable';
import NavBar from '../components/NavBar';
import StatusBar from '../components/StatusBar';
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
    console.log();
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
      console.log(result.message);
    }
    setSale({ ...sale, status });
  };

  return (
    <Box
      sx={ {
        backgroundColor: '#f8f8f8',
        margin: 0,
        paddingTop: 15,
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
            fontSize: 35,
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
          { sale && (<StatusBar
            sale={ sale }
            user={ user }
            handleStatus={ handleStatus }
          />)}
          { sale && (
            <CheckoutTable
              tableColumns={ tableColumns }
              cart={ sale.products }
              remove={ remove }
              isCheckout={ false }
              ROUTE={ ROUTE }
              totalValue={ +sale.totalPrice }
            />
          )}
        </Paper>
      </Container>
    </Box>
  );
}
