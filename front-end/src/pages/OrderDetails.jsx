import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutTable from '../components/CheckoutTable';
import NavBar from '../components/NavBar';
import AppContext from '../context/AppContext';
import { getSaleById } from '../utils/fetchApi';

const getRoute = (role) => {
  if (role === 'customer') {
    return {
      route: 'customer_order_details', element: 'element-order-details',
    };
  }
  return {
    route: 'seller_order_details', element: 'element-order-details',
  };
};

export default function OrderDetails() {
  const [sale, setSale] = useState(undefined);
  const { id } = useParams();
  const { user } = useContext(AppContext);

  const ROUTE = getRoute(user.role).route;
  const ELEMENT = getRoute(user.role).element;

  const remove = () => {
    console.log();
  };

  const getDate = (ISODate) => {
    const SLICE = -2;
    const date = new Date(ISODate);
    return `${(`0${date.getDate()}`).slice(SLICE)}/${
      (`0${date.getMonth() + 1}`).slice(SLICE)}/${
      date.getFullYear()}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const saleData = await getSaleById({ id, token: user.token });
      console.log(saleData);
      setSale(saleData);
    };
    fetchData();
  }, []); // eslint-disable-line

  const tableColumns = [
    { head: 'Item' },
    { head: 'Descrição' },
    { head: 'Quantidade' },
    { head: 'Valor Unitário' },
    { head: 'Sub-total' },
  ];

  return (
    <div>
      <NavBar />
      <h2>Detalhes do Pedido</h2>
      <div>
        <div
          data-testid={
            `${ROUTE}__${ELEMENT}-label-order-id`
          }
        >
          {sale && `PEDIDO: ${sale.id}`}
        </div>
        { sale && user.role === 'customer'
          ? (
            <div
              data-testid={
                `${ROUTE}__${ELEMENT}-label-seller-name`
              }
            >
              {sale && `P.Vend: ${sale.seller.name}`}
            </div>)
          : null }
        <div
          data-testid={
            `${ROUTE}__${ELEMENT}-label-order-date`
          }
        >
          {sale && getDate(sale.saleDate)}
        </div>
        <div
          data-testid={
            `${ROUTE}__${ELEMENT}-label-delivery-status`
          }
        >
          {sale && sale.status}
        </div>
        { sale && user.role === 'seller' ? (
          <button
            type="button"
            data-testid={
              `${ROUTE}__button-preparing-check`
            }
            disabled={ sale.status !== 'Pendente' }
          >
            preparar pedido
          </button>) : null}
        { sale && user.role === 'seller' ? (
          <button
            type="button"
            data-testid={
              `${ROUTE}__button-dispatch-check`
            }
            disabled={ sale.status !== 'Preparando' }
          >
            saiu para entrega
          </button>) : null}
        { sale && user.role === 'customer' ? (
          <button
            type="button"
            data-testid={
              `${ROUTE}__button-delivery-check`
            }
            disabled={ sale.status !== 'Em Trânsito' }
          >
            marcar como entregue
          </button>) : null}
      </div>
      { console.log(sale) }
      { sale ? (
        <CheckoutTable
          tableColumns={ tableColumns }
          cart={ sale.products }
          remove={ remove }
          isCheckout={ false }
          ROUTE={ ROUTE }
          totalValue={ +sale.totalPrice }
        />
      ) : 'teste' }

    </div>
  );
}
