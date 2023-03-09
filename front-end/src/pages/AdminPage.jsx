import React from 'react';
import NavBar from '../components/NavBar';
import UsersTable from '../components/UsersTable';
import Register from './Register';

function AdminPage() {
  return (
    <div>
      <NavBar />
      <Register />
      <UsersTable />
    </div>
  );
}

export default AdminPage;
