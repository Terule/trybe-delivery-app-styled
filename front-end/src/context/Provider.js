import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import usePersistState from '../hooks/usePersistState';

function Provider({ children }) {
  const [user, setUser] = usePersistState(
    'user',
    JSON.parse(localStorage.getItem('user')) || undefined,
  );
  const [theme, setTheme] = usePersistState(
    'theme',
    localStorage.getItem('theme') || 'light',
  );
  const [cart, setCart] = usePersistState('cart', []);
  const [seller, setSeller] = usePersistState('seller', []);

  const contextValue = useMemo(
    () => (
      {
        user,
        setUser,
        cart,
        setCart,
        seller,
        setSeller,
        theme,
        setTheme,
      }),
    [setUser,
      user,
      cart,
      setCart,
      seller,
      setSeller,
      theme,
      setTheme,
    ],
  );

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
