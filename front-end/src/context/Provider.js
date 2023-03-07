import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import usePersistState from '../hooks/usePersistState';

function Provider({ children }) {
  const [user, setUser] = usePersistState(
    'user',
    JSON.parse(localStorage.getItem('user')) || {},
  );
  const [cart, setCart] = usePersistState('cart', []);
  const [seller, setSeller] = usePersistState('seller', []);

  const contextValue = useMemo(
    () => (
      { user,
        setUser,
        cart,
        setCart,
        seller,
        setSeller }),
    [setUser,
      user,
      cart,
      setCart,
      seller,
      setSeller],
  );

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
