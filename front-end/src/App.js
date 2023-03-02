import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" render={ () => (<Redirect to="/login" />) } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
      </Switch>
    </Provider>
  );
}

export default App;
