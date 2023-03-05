import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import verifyToken from '../utils/verifyToken';

export default function DeliveryForm({ seller, cart }) {
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

  const mandarTrem = (e) => {
    e.preventDefault();
    const { deliveryAddress, deliveryNumber } = inputData;
    console.log(deliveryAddress);
    const costumer = verifyToken(user.token);
    const objToDB = {
      deliveryAddress,
      deliveryNumber,
      userId: costumer.id,
      totalPrice: total,
      sellerId: seller.id,
    };
    console.log(objToDB);
    return objToDB;
  };

  return (
    <div>
      <h2>Detalhes e Endereço para Entrega</h2>
      <form onSubmit={ mandarTrem }>
        <label
          htmlFor="sellerName"
        >
          <select
            name="sellerName"
            value={ inputData.sellerName }
            data-testid="customer_checkout__select-seller"
            onChange={ (e) => setInputData(
              { ...inputData, sellerName: e.target.value },
            ) }
          >
            P. Vendedora Responsável:
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
            required="true"
            name="deliveryNumber"
            value={ inputData.deliveryNumber }
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ mandarTrem }
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
  })).isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
    url: PropTypes.string,
  })).isRequired,
};
