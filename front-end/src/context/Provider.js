import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import usePersistState from '../hooks/usePersistState';

function Provider({ children }) {
  const [user, setUser] = usePersistState('user', undefined);
  const [cart, setCart] = usePersistState('cart', []);

  const contextValue = useMemo(() => (
    { user, setUser, cart, setCart }), [setUser, user, cart, setCart]);

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
