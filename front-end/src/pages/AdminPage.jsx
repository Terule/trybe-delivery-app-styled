import { Paper } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import RegisterForm from '../components/RegisterForm';
import UserList from '../components/UserList';
import UsersTable from '../components/UsersTable';
import AppContext from '../context/AppContext';
import { deleteUser, getUsers } from '../utils/fetchApi';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AppContext);

  const removeUser = useCallback(async (id) => { // eslint-disable-line
    const { token } = user;
    await deleteUser(token, id);
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsers();
      setUsers(result);
    };
    fetchUsers();
  }, [removeUser]);
  return (
    <Box
      sx={ {
        margin: 0,
        paddingTop: 12,
        paddingBottom: 7,
        minHeight: 750,
      } }
    >
      <NavBar />
      <Container
        sx={ {
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          maxWidth: { xs: 'sm', md: 'xl' },
        } }
      >
        <Paper>
          <UsersTable users={ users } removeUser={ removeUser } />
          <UserList users={ users } removeUser={ removeUser } />
        </Paper>
        <RegisterForm />
        <Container
        sx={ {
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          maxWidth: { xs: 'sm', md: 'xl' },
        } }
      >
        <Paper>
          <UsersTable users={ users } removeUser={ removeUser } />
          <UserList users={ users } removeUser={ removeUser } />
        </Paper>
        <RegisterForm />
      </Container>
    </Box>
  );
}

export default AdminPage;
