import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

const ROUTE = 'customer_products';
const ELEMENT = 'element-navbar';

function NavBar() {
  const { user, setUser } = useContext(AppContext);
  // const user = JSON.parse(localStorage.getItem('user'));

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
        { user.name }
      </div>

      <Link
        data-testid={ `${ROUTE}__${ELEMENT}-link-logout` }
        to="/"
        onClick={ () => setUser(undefined) }
      >
        Sair
      </Link>
    </div>
  );
}

export default NavBar;
