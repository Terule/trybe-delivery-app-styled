import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ClientOrder({ order, status, price, date }) {
  const ROUTE = 'customer_orders_';
  const CARD_ORDER = '_element-order-id-';
  const CARD_STATUS = '_element-delivery-status-';
  const CARD_DATE = '_element-order-date-';
  const CARD_PRICE = '_element-card-price-';
  return (
    <main>
      <card>
        <Link to={ `localhost:3000/customer/orders/${order}` }>
          <div>
            <span data-testid={ `${ROUTE}${CARD_ORDER}${order}` }>
              {order}
            </span>
            <span data-testid={ `${ROUTE}${CARD_STATUS}${order}` }>
              {status}
            </span>
          </div>
          <div>
            <p data-testid={ `${ROUTE}${CARD_DATE}${order}` }>
              {date}
            </p>
            <p data-testid={ `${ROUTE}${CARD_PRICE}${order}` }>
              {price}
            </p>
          </div>
        </Link>
      </card>
    </main>
  );
}

export default ClientOrder;

ClientOrder.propTypes = {
  order: PropTypes.number,
  status: PropTypes.string,
  price: PropTypes.number,
  date: PropTypes.string,
}.isRequired;
