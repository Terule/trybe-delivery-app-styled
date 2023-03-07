import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutTable from '../components/CheckoutTable';
import NavBar from '../components/NavBar';
import AppContext from '../context/AppContext';
import { getSaleById } from '../utils/fetchApi';

const ROUTE = 'customer_order_details';
const ELEMENT = 'element-order-details';

export default function OrderDetails() {
  const [sale, setSale] = useState(undefined);
  const { id } = useParams();
  const { user } = useContext(AppContext);

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
  }, []);

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
        <div
          data-testid={
            `${ROUTE}__${ELEMENT}-label-seller-name`
          }
        >
          {sale && `P.Vend: ${sale.seller.name}`}
        </div>
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
        <button
          type="button"
          data-testid={
            `${ROUTE}__button-delivery-check`
          }
          disabled
        >
          marcar como entregue
        </button>
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
