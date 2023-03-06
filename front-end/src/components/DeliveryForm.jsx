import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { newSale } from '../utils/fetchApi';
import verifyToken from '../utils/verifyToken';

export default function DeliveryForm({ seller, cart }) {
  const history = useHistory();
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
    history.push(`orders/${saleId}`);
  };

  return (
    <div>
      <h2>Detalhes e Endereço para Entrega</h2>
      <form onSubmit={ handleSubmit }>
        <label
          htmlFor="sellerName"
        >
          P. Vendedora Responsável:
          <select
            name="sellerName"
            value={ inputData.sellerName }
            data-testid="customer_checkout__select-seller"
            onChange={ (e) => setInputData(
              { ...inputData, sellerName: e.target.value },
            ) }
          >
            {seller.map((person) => (
              <option
                data-testid="customer_checkout__select-seller"
                key={ person.name }
              >
                {person.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="deliveryAddress">

          Endereço:
          <input
            data-testid="customer_checkout__input-address"
            type="text"
            name="deliveryAddress"
            maxLength="100"
            value={ inputData.deliveryAddress }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="deliveryNumber">

          Número:
          <input
            data-testid="customer_checkout__input-address-number"
            type="text"
            required
            name="deliveryNumber"
            value={ inputData.deliveryNumber }
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="customer_checkout__button-submit-order"
          type="submit"
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
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
