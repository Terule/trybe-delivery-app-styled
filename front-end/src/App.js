import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={ () => (<Redirect to="/login" />) } />
      <Route exact path="/login" component={ Login } />
    </Switch>
  );
}

export default App;
