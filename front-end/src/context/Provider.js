import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import usePersistState from '../hooks/usePersistState';

function Provider({ children }) {
  const [userData, setUserData] = usePersistState('userData', {
    name: '',
    email: '',
    role: '',
    token: '',
  });

  const contextValue = useMemo(() => (
    { userData, setUserData }), [setUserData, userData]);

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
