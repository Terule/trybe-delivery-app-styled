import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import Provider from './context/Provider';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" render={ () => (<Redirect to="/login" />) } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/products" component={ CustomerProducts } />
        <Route exact path="/customer/orders" component={ Orders } />
        <Route exact path="/customer/checkout" component={ Checkout } />
      </Switch>
    </Provider>
  );
}

export default App;
