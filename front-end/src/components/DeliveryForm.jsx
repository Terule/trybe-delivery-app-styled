import { Button,
  FormControl,
  Grid,
  InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { newSale } from '../utils/fetchApi';
import verifyToken from '../utils/verifyToken';

export default function DeliveryForm({ seller, cart }) {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [inputData, setInputData] = useState({
    sellerName: '',
    deliveryAddress: '',
    deliveryNumber: '',
  });

  const total = cart.reduce((acc, { price, quantity }) => {
    const totalValue = price * quantity;
    return acc + totalValue;
  }, 0);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { deliveryAddress, deliveryNumber } = inputData;
    const costumer = verifyToken(user.token);
    const objToDB = {
      deliveryAddress,
      deliveryNumber,
      userId: costumer.id,
      totalPrice: total,
      sellerId: seller[0].id,
    };
    const saleId = await newSale(
      { saleData: objToDB,
        token: user.token,
        products: cart.map((product) => ({ id: product.id, quantity: product.quantity })),
      },
    );
    navigate(`/customer/orders/${saleId}`);
  };

  return (
    <Paper
      sx={ {
        padding: '10px',
      } }
    >
      <Grid container spacing={ 2 }>
        <Grid item xs={ 12 } md={ 3 }>
          <FormControl
            sx={ { width: { xs: '100%', md: 250 } } }
          >
            <InputLabel
              htmlFor="sellerName"
            >
              P. Vendedora Responsável
            </InputLabel>
            <Select
              sx={ { width: '100%' } }
              size="small"
              label="P. Vendedora Responsável"
              name="sellerName"
              value={ inputData.sellerName }
              data-testid="customer_checkout__select-seller"
              onChange={ (e) => setInputData(
                { ...inputData, sellerName: e.target.value },
              ) }
            >
              {seller && (
                <MenuItem
                  value=""
                >
                  Selecione
                </MenuItem>
              )}
              {seller.map((person) => (
                <MenuItem
                  data-testid="customer_checkout__select-seller"
                  key={ person.name }
                  value={ person.name }
                >
                  {person.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <FormControl
            sx={ { width: { xs: '100%', md: 250 } } }
          >
            <TextField
              sx={ { width: { xs: '100%', md: 250 } } }
              data-testid="customer_checkout__input-address"
              variant="outlined"
              label="Endereço"
              size="small"
              type="text"
              required
              name="deliveryAddress"
              maxLength="100"
              value={ inputData.deliveryAddress }
              onChange={ handleChange }
            />
          </FormControl>
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <FormControl
            sx={ { width: { xs: '100%', md: 250 } } }
          >
            <TextField
              data-testid="customer_checkout__input-address-number"
              type="text"
              size="small"
              label="Número"
              required
              name="deliveryNumber"
              value={ inputData.deliveryNumber }
              onChange={ handleChange }
            />
          </FormControl>
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <FormControl
            sx={ { width: { xs: '100%', md: 250 } } }
          >
            <Button
              data-testid="customer_checkout__button-submit-order"
              onClick={ handleSubmit }
              variant="contained"
              type="submit"
            >
              FINALIZAR PEDIDO
            </Button>
          </FormControl>
        </Grid>
      </Grid>

    </Paper>
  );
}

DeliveryForm.propTypes = {
  seller: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
    url: PropTypes.string,
  })).isRequired,
};
