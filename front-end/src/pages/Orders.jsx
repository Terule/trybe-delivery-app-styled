import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import ClientOrder from '../components/ClientOrder';
import { getAllSales } from '../utils/fetchApi';
import AppContext from '../context/AppContext';

function Orders() {
  const [clientOrders, setClientOrders] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchSales = async () => {
      const sales = await getAllSales();
      if (user.role === 'customer') {
        const orders = sales.filter((sale) => user.id === sale.userId);
        setClientOrders(orders);
      }
      if (user.role === 'seller') {
        const orders = sales.filter((sale) => user.id === sale.sellerId);
        setClientOrders(orders);
      }
    };
    fetchSales();
  }, []); // eslint-disable-line

  const clientOrderHtml = clientOrders.map((sale) => (
    <ClientOrder
      key={ sale.id }
      order={ sale.id }
      status={ sale.status }
      price={ sale.totalPrice }
      date={ sale.saleDate }
      isSeller={ user.role === 'seller' }
    />
  ));

  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <main>
        { clientOrderHtml }
      </main>
    </>
  );
}

export default Orders;
