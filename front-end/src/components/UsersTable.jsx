import React from 'react';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const ROUTE = 'admin_manage';
const ELEMENT = 'element-user-table';

function UsersTable({ users, removeUser }) {
  return (
    <Table
      sx={ {
        display: { xs: 'none', md: 'table' },
        minWidth: { xs: 300, md: 700, lg: 900 },
      } }
    >
      <TableHead>
        <TableRow>
          <TableCell align="center">Item</TableCell>
          <TableCell align="center">Nome</TableCell>
          <TableCell align="center">E-mail</TableCell>
          <TableCell align="center">Tipo</TableCell>
          <TableCell align="center">Excluir</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((element, index) => (
          <TableRow key={ element.id }>
            <TableCell
              align="center"
              data-testid={ `${ROUTE}__${ELEMENT}-item-number-${index}` }
            >
              { index + 1 }
            </TableCell>
            <TableCell
              align="center"
              data-testid={ `${ROUTE}__${ELEMENT}-name-${index}` }
            >
              { element.name }
            </TableCell>
            <TableCell
              align="center"
              data-testid={ `${ROUTE}__${ELEMENT}-email-${index}` }
            >
              { element.email }
            </TableCell>
            <TableCell
              align="center"
              data-testid={ `${ROUTE}__${ELEMENT}-role-${index}` }
            >
              { element.role }
            </TableCell>
            <TableCell
              align="center"
            >
              <IconButton
                type="button"
                data-testid={ `${ROUTE}__${ELEMENT}-remove-${index}` }
                onClick={ () => removeUser(element.id) }
              >
                <DeleteIcon color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default UsersTable;
