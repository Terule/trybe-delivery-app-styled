import React, { useEffect, useState } from 'react';
import { getUsers } from '../utils/fetchApi';

const ROUTE = 'admin_manage';
const ELEMENT = 'element-user-table';

function UsersTable() {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchApiData = async () => {
  //     const result = await getUsers();

  //     return setUsers(result);
  //   };
  //   fetchApiData();
  //   console.log(fetchApiData());
  //   console.log(users);
  // }, []);

  useEffect(async () => {
    const result = await getUsers();
    setUsers(result);
  }, []);
  console.log(users);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={ user.name }>
              <td data-testid={ `${ROUTE}__${ELEMENT}-item-number-${index}` }>
                { index + 1 }
              </td>
              <td data-testid={ `${ROUTE}__${ELEMENT}-name-${index}` }>
                { user.name }
              </td>
              <td data-testid={ `${ROUTE}__${ELEMENT}-email-${index}` }>
                { user.email }
              </td>
              <td data-testid={ `${ROUTE}__${ELEMENT}-role-${index}` }>
                { user.role }
              </td>
              <td data-testid={ `${ROUTE}__${ELEMENT}-remove-${index}` }>
                <button type="button">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
