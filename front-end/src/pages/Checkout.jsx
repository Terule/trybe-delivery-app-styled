import { useContext, useEffect } from 'react';
import CheckoutTable from '../components/CheckoutTable';
import DeliveryForm from '../components/DeliveryForm';
import NavBar from '../components/NavBar';
import AppContext from '../context/AppContext';
// import { getSeller } from '../utils/fetchApi';

const ROUTE = 'customer_checkout';

export default function Checkout() {
  const { cart, setCart, seller, setSeller } = useContext(AppContext);
  const remove = (id) => {
    setCart(
      cart.filter((element) => element.id !== Number(id)),
    );
  };

  useEffect(() => {
    const fetchSeller = async () => {
      const sellerResp = [{
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6', // fulana@123
        role: 'seller',
        id: 2,
      }];
      setSeller(sellerResp);
    };
    fetchSeller();
  }, []); // eslint-disable-line

  const tableColumns = [
    { head: 'Item' },
    { head: 'Descrição' },
    { head: 'Quantidade' },
    { head: 'Valor Unitário' },
    { head: 'Sub-total' },
    { head: 'Remover Item' },
  ];
  return (
    <div>
      <NavBar />
      <h3>Finalizar Pedido</h3>
      <CheckoutTable
        tableColumns={ tableColumns }
        cart={ cart }
        remove={ remove }
        isCheckout
        ROUTE={ ROUTE }
      />
      <DeliveryForm seller={ seller } cart={ cart } />
    </div>
  );
}
