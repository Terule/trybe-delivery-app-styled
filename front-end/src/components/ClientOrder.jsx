import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ROUTE = 'customer_orders_';
const CARD_ORDER = '_element-order-id-';
const CARD_STATUS = '_element-delivery-status-';
const CARD_DATE = '_element-order-date-';
const CARD_PRICE = '_element-card-price-';

function ClientOrder({ order, status, price, date, adress, isSeller }) {
  return (
    <main>
      <div>
        <Link to={ `localhost:3000/customer/orders/${order}` }>
          <div>
            <span data-testid={ `${ROUTE}${CARD_ORDER}${order}` }>
              {order}
            </span>
          </div>
          <div>
            <p data-testid={ `${ROUTE}${CARD_STATUS}${order}` }>
              {status}
            </p>
            <p data-testid={ `${ROUTE}${CARD_DATE}${order}` }>
              {date}
            </p>
            <p data-testid={ `${ROUTE}${CARD_PRICE}${order}` }>
              {price}
            </p>
            { (
              <span>
                {adress}
              </span>
            ) && isSeller }
          </div>
        </Link>
      </div>
    </main>
  );
}

export default ClientOrder;

ClientOrder.propTypes = {
  order: PropTypes.number,
  status: PropTypes.string,
  price: PropTypes.number,
  date: PropTypes.string,
  adress: PropTypes.string,
  isSeller: PropTypes.bool,
}.isRequired;
