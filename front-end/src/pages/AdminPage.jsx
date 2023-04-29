import { Paper } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import NewProductForm from '../components/NewProductForm';
import ProductsTable from '../components/ProductsTable';
import RegisterForm from '../components/RegisterForm';
import UserList from '../components/UserList';
import UsersTable from '../components/UsersTable';
import AppContext from '../context/AppContext';
import { deleteProduct, deleteUser, getProducts, getUsers } from '../utils/fetchApi';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const { user } = useContext(AppContext);

  const removeUser = useCallback(async (id) => {
    const { token } = user;
    await deleteUser(token, id);
  });

  const removeProduct = useCallback(async (id) => {
    const { token } = user;
    await deleteProduct(token, id);
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsers();
      setUsers(result);
    };
    fetchUsers();
  }, [removeUser]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts();
      setProducts(result);
    };
    fetchProducts();
  }, [removeProduct]);
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
          <ProductsTable users={ users } removeProduct={ removeProduct } />
          <UserList users={ users } removeProduct={ removeProduct } />
        </Paper>
        <RegisterForm />
      </Container>
      <Container
        sx={ {
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          maxWidth: { xs: 'sm', md: 'xl' },
          marginTop: 5,
        } }
      >
        <Paper>
          <UsersTable users={ products } removeUser={ removeUser } />
          <UserList users={ users } removeUser={ removeUser } />
        </Paper>
        <NewProductForm />
      </Container>
    </Box>
  );
}

export default AdminPage;
