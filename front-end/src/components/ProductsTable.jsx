import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const ROUTE = 'admin_manage';
const ELEMENT = 'element-user-table';

function ProductsTable({ products, removeProduct }) {
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
          <TableCell align="center">Valor</TableCell>
          <TableCell align="center">Imagem</TableCell>
          <TableCell align="center">Excluir</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={ product.id }>
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
              { product.name }
            </TableCell>
            <TableCell
              align="center"
              data-testid={ `${ROUTE}__${ELEMENT}-email-${index}` }
            >
              { product.price }
            </TableCell>
            <TableCell
              align="center"
              data-testid={ `${ROUTE}__${ELEMENT}-role-${index}` }
            >
              { product.url_image }
            </TableCell>
            <TableCell
              align="center"
            >
              <IconButton
                type="button"
                data-testid={ `${ROUTE}__${ELEMENT}-remove-${index}` }
                onClick={ () => removeProduct(product.id) }
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

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  removeProduct: PropTypes.func.isRequired,
};

export default ProductsTable;
