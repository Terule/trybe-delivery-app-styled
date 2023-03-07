import PropTypes from 'prop-types';

const ELEMENT = 'element-order-table';

export default function CheckoutTable({
  tableColumns, cart, remove, isCheckout, ROUTE, totalValue }) {
  const total = cart.reduce((acc, product) => {
    const value = product.price * product.quantity;
    return acc + value;
  }, 0);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {tableColumns.map((head) => <th key={ head.head }>{head.head}</th>)}
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={ product.name }>
              <td
                data-testid={ `${ROUTE}__${ELEMENT}-item-number-${index}` }
              >
                {index + 1}

              </td>
              <td data-testid={ `${ROUTE}__${ELEMENT}-name-${index}` }>{product.name}</td>
              <td
                data-testid={ `${ROUTE}__${ELEMENT}-quantity-${index}` }
              >
                {isCheckout
                  ? (product.quantity)
                  : (product.SaleProduct.quantity)}

              </td>
              <td
                data-testid={ `${ROUTE}__${ELEMENT}-unit-price-${index}` }
              >
                {product.price.replace('.', ',')}

              </td>
              <td
                data-testid={ `${ROUTE}__${ELEMENT}-sub-total-${index}` }
              >
                {isCheckout
                  ? (product.price * product.quantity).toFixed(2).replace('.', ',')
                  : (product.price * product.SaleProduct.quantity)
                    .toFixed(2).replace('.', ',')}

              </td>
              {isCheckout && (
                <td>
                  <button
                    type="button"
                    data-testid={ `${ROUTE}__${ELEMENT}-remove-${index}` }
                    onClick={ () => remove(product.id) }
                  >
                    remover

                  </button>
                </td>
              )}
            </tr>
          ))}

        </tbody>

      </table>
      <span data-testid={ `${ROUTE}__element-order-total-price` }>
        {isCheckout ? total.toFixed(2).replace('.', ',')
          : totalValue.toFixed(2).replace('.', ',')}
      </span>
    </div>
  );
}

CheckoutTable.propTypes = {
  tableColumns: PropTypes.arrayOf(PropTypes.shape({
    head: PropTypes.string,
  })).isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
    url: PropTypes.string,
  })).isRequired,
  totalValue: PropTypes.number,
  remove: PropTypes.func.isRequired,
  isCheckout: PropTypes.bool.isRequired,
  ROUTE: PropTypes.string.isRequired,
};

CheckoutTable.defaultProps = {
  totalValue: 0,
};
