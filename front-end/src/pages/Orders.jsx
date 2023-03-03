import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import ClientOrder from '../components/ClientOrder';
import { getAllSales } from '../utils/fetchApi';

function Orders() {
  const [clientOrders, setClientOrders] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const sales = await getAllSales();
      const userData = JSON.parse(localStorage.getItem('user'));
      const orders = sales.filter((sale) => userData.id === sale.userId);
      setClientOrders(orders);
    };
    fetchSales();
  }, []);

  const clientOrderHtml = clientOrders.map((sale) => (
    <ClientOrder
      key={ sale.id }
      order={ sale.id }
      status={ sale.status }
      price={ sale.price }
      date={ sale.date }
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
