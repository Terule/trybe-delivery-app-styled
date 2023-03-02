import React, { useState, useEffect } from 'react';
import ClientOrder from '../components/ClientOrder';

function Orders() {
  const [clientOrders, setClientOrders] = useState([]);
  useEffect(() => {
    const fetchSales = async () => {
      const sales = await fetchAllSales(); // create axios function
      const userData = JSON.parse(localStorage.getItem('userData'));
      const orders = sales.filter((sale) => sale.userId === userData.id);
      setClientOrders(orders);
    };
    fetchSales();
  }, []);

  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <main>
        <ordercontainer>
          <ClientOrder />
        </ordercontainer>
      </main>
    </>
  );
}

export default Orders;
