import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

const ROUTE = 'costumer_products';
const ELEMENT = 'element-navbar';

function NavBar() {
  const { userData, setUserData } = useContext(AppContext);

  console.log(userData);

  return (
    <div>
      <Link
        data-testid={ `${ROUTE}__${ELEMENT}-link-products` }
        to="/customer/products"
      >
        Produtos
      </Link>

      <Link
        data-testid={ `${ROUTE}__${ELEMENT}-link-orders` }
        to="/customer/orders"
      >
        Meus Pedidos
      </Link>

      <div
        data-testid={ `${ROUTE}__${ELEMENT}-user-full-name` }
      >
        { userData.name }
      </div>

      <Link
        data-testid={ `${ROUTE}__${ELEMENT}-link-logout` }
        to="/"
        onClick={ () => setUserData({
          name: '',
          email: '',
          role: '',
          token: '' }) }
      >
        Sair
      </Link>
    </div>
  );
}

export default NavBar;
