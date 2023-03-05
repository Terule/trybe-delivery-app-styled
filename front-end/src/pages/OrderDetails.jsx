import CheckoutTable from '../components/CheckoutTable';
import NavBar from '../components/NavBar';

const ROUTE = 'customer_order_details';
const ELEMENT = 'element-order-details';

export default function OrderDetails() {
  return (
    <div>
      <NavBar />
      <h2>Detalhes do Pedido</h2>
      <table>

        <tr>
          <td
            data-testid={
              `${ROUTE}__${ELEMENT}-label-order-id`
            }
          >
            pedido 003
          </td>
          <td
            data-testid={
              `${ROUTE}__${ELEMENT}-label-seller-name`
            }
          >
            vendedor x
          </td>
          <td
            data-testid={
              `${ROUTE}__${ELEMENT}-label-order-date`
            }
          >
            data
          </td>
          <td
            data-testid={
              `${ROUTE}__${ELEMENT}-label-delivery-status<index>`
            }
          >
            entregue
          </td>
          <button
            type="button"
            data-testid={
              `${ROUTE}__${ELEMENT}__button-delivery-check<index>`
            }
          >
            marcar como entregue

          </button>
        </tr>
      </table>
      <CheckoutTable ROUTE={ ROUTE } />

    </div>
  );
}
