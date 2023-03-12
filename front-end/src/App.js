import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import Provider from './context/Provider';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Provider>
      <Routes>
        <Route exact path="/" element={ <Navigate replace to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/customer/products" element={ <CustomerProducts /> } />
        <Route exact path="/customer/orders" element={ <Orders /> } />
        <Route exact path="/customer/checkout" element={ <Checkout /> } />
        <Route exact path="/customer/orders/:id" element={ <OrderDetails /> } />
        <Route exact path="/seller/orders" element={ <Orders /> } />
        <Route exact path="/seller/orders/:id" element={ <OrderDetails /> } />
        <Route exact path="/admin/manage" element={ AdminPage } />
      </Routes>
    </Provider>
  );
}

export default App;
