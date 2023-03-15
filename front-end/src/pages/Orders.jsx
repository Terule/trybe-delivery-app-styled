import React, { useState, useEffect, useContext } from 'react';
import { Box, Container, Grid } from '@mui/material';
import NavBar from '../components/NavBar';
import ClientOrder from '../components/ClientOrder';
import { getAllSales } from '../utils/fetchApi';
import AppContext from '../context/AppContext';

function Orders() {
  const [clientOrders, setClientOrders] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchSales = async () => {
      const sales = await getAllSales();
      console.log(sales);
      if (user.role === 'customer') {
        const orders = sales.filter((sale) => user.id === sale.userId);
        setClientOrders(orders);
      }
      if (user.role === 'seller') {
        const orders = sales.filter((sale) => user.id === sale.sellerId);
        setClientOrders(orders);
      }
    };
    fetchSales();
  }, []); // eslint-disable-line

  const clientOrderHtml = clientOrders.map((sale) => (
    <ClientOrder
      key={ sale.id }
      order={ sale.id }
      status={ sale.status }
      price={ sale.totalPrice }
      date={ sale.saleDate }
      address={ sale.deliveryAddress }
      number={ sale.deliveryNumber }
      user={ sale.user }
      products={ sale.products }
      isSeller={ user.role === 'seller' }
    />
  ));

  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <Box
        sx={ {
          backgroundColor: '#f8f8f8',
          margin: 0,
          paddingTop: 12,
          paddingBottom: 7,
          minHeight: 750,
        } }
      >
        <Container maxWidth="xl">
          <Grid container spacing={ 2 }>
            { clientOrderHtml }
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Orders;
