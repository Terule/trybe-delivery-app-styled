import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import AppContext from '../context/AppContext';
import { getProducts } from '../utils/fetchApi';

function CustomerProducts() {
  const [productsData, setProductsData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const { user, setCart } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts(user.token);
      products.forEach((product) => {
        product.quantity = 0;
      });
      setProductsData(products);
      return products;
    };
    fetchProducts();
  }, []); // eslint-disable-line

  useEffect(() => {
    const validateQuantity = () => {
      const result = productsData.some((product) => product.quantity > 0);

      if (result) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    validateQuantity();
  }, [productsData]);

  const plusClick = (id) => {
    const product = productsData.find((item) => item.id === Number(id));
    product.quantity += 1;
    setProductsData([...productsData]);
  };

  const minusClick = (id) => {
    const product = productsData.find((item) => item.id === Number(id));
    if (product.quantity > 0) {
      product.quantity -= 1;
      setProductsData([...productsData]);
    } else {
      product.quantity = 0;
      setProductsData([...productsData]);
    }
  };

  const handleChange = (e, id) => {
    const product = productsData.find((item) => item.id === Number(id));
    product.quantity = Number(e.target.value);
    setProductsData([...productsData]);
  };

  const total = productsData.reduce((acc, { price, quantity }) => {
    const totalValue = price * quantity;
    return acc + totalValue;
  }, 0);

  const onSubmit = () => {
    const products = productsData.filter((product) => product.quantity > 0);
    setCart(products);
    navigate('/customer/checkout');
  };

  return (
    <Box
      sx={ {
        backgroundColor: '#f8f8f8',
        margin: 0,
        paddingTop: 15,
        paddingBottom: 7,
      } }
    >
      <NavBar />
      <Card
        elevation={ 3 }
        sx={ {
          marginRight: '20px',
          width: '300px',
          position: 'fixed',
          top: '120px',
          left: '1575px',
          right: '0',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
        } }
      >
        <CardContent
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          } }
        >
          <Typography
            sx={ {
              fontWeight: 700,
              fontSize: 35,
              alignSelf: 'center',
              textDecoration: 'none',
            } }
          >
            Total:
          </Typography>
          <Typography
            sx={ {
              fontWeight: 700,
              fontSize: 40,
              alignSelf: 'center',
              textDecoration: 'none',
            } }
          >
            {`R$ ${total.toFixed(2).replace('.', ',')}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            type="button"
            variant="contained"
            size="large"
            onClick={ onSubmit }
            disabled={ isDisabled }
            data-testid="customer_products__button-cart"
            fullWidth
            sx={ { fontWeight: 700 } }
          >
            Ver Carrinho
          </Button>
        </CardActions>
      </Card>
      <Container
        sx={ {
          display: 'flex',
        } }
      >
        <Grid container spacing={ 2 }>
          {productsData.map((product) => (
            <ProductCard
              key={ product.id }
              product={ product }
              minusClick={ minusClick }
              plusClick={ plusClick }
              handleChange={ handleChange }
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default CustomerProducts;
