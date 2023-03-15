import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import CheckoutTable from '../components/CheckoutTable';
import DeliveryForm from '../components/DeliveryForm';
import NavBar from '../components/NavBar';
import AppContext from '../context/AppContext';
import { getSeller } from '../utils/fetchApi';

const ROUTE = 'customer_checkout';

export default function Checkout() {
  const { cart, setCart } = useContext(AppContext);
  const [seller, setSeller] = useState([]);
  const remove = (id) => {
    setCart(
      cart.filter((element) => element.id !== Number(id)),
    );
  };

  useEffect(() => {
    const fetchSeller = async () => {
      const sellerList = await getSeller();
      setSeller(sellerList);
    };
    fetchSeller();
  }, []); // eslint-disable-line

  const tableColumns = [
    { head: 'Item' },
    { head: 'Descrição' },
    { head: 'Quantidade' },
    { head: 'Valor Unitário' },
    { head: 'Sub-total' },
    { head: 'Remover Item' },
  ];
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
          Finalizar pedido
        </Typography>
        <CheckoutTable
          tableColumns={ tableColumns }
          cart={ cart }
          remove={ remove }
          isCheckout
          ROUTE={ ROUTE }
        />
        <Typography
          element="h1"
          sx={ {
            fontWeight: 700,
            fontSize: 35,
            alignSelf: 'center',
            textDecoration: 'none',
            marginBottom: 2,
            marginTop: 2,
          } }
        >
          Detalhes e endereço de entrega
        </Typography>
        <DeliveryForm seller={ seller } cart={ cart } />
      </Container>
    </Box>
  );
}
