import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';

const ELEMENT = 'element-order-table';
const MAX_COL = 4;
const MIN_COL = 3;

export default function CheckoutTable({
  cart, remove, isCheckout, ROUTE, totalValue }) {
  const total = cart.reduce((acc, product) => {
    const value = product.price * product.quantity;
    return acc + value;
  }, 0);

  return (
    <TableContainer component={ Paper } elevation={ 1 }>
      <Table
        sx={ { display: { xs: 'none', md: 'table' } } }
      >
        <TableHead>
          <TableRow>
            <TableCell sx={ { fontWeight: 700 } } align="center">ITEM</TableCell>
            <TableCell sx={ { fontWeight: 700 } }>DESCRIÇÃO</TableCell>
            <TableCell sx={ { fontWeight: 700 } } align="center">QUANTIDADE</TableCell>
            <TableCell
              sx={ { fontWeight: 700 } }
              align="center"
            >
              VALOR UNITÁRIO
            </TableCell>
            <TableCell sx={ { fontWeight: 700 } } align="center">SUB-TOTAL</TableCell>
            {isCheckout ? (
              <TableCell
                sx={ { fontWeight: 700 } }
                align="center"
              >
                REMOVER ITEM

              </TableCell>) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((product, index) => (
            <TableRow key={ product.name }>
              <TableCell
                align="center"
                data-testid={ `${ROUTE}__${ELEMENT}-item-number-${index}` }
              >
                {index + 1}

              </TableCell>
              <TableCell
                data-testid={ `${ROUTE}__${ELEMENT}-name-${index}` }
              >
                {product.name}
              </TableCell>
              <TableCell
                align="center"
                data-testid={ `${ROUTE}__${ELEMENT}-quantity-${index}` }
              >
                {isCheckout
                  ? (product.quantity)
                  : (product.SaleProduct.quantity)}

              </TableCell>
              <TableCell
                align="center"
                data-testid={ `${ROUTE}__${ELEMENT}-unit-price-${index}` }
              >
                {`R$ ${product.price.replace('.', ',')}`}

              </TableCell>
              <TableCell
                align="center"
                data-testid={ `${ROUTE}__${ELEMENT}-sub-total-${index}` }
              >
                {isCheckout
                  ? `R$ ${(product.price * product.quantity)
                    .toFixed(2).replace('.', ',')}`
                  : `R$ ${(product.price * product.SaleProduct.quantity)
                    .toFixed(2).replace('.', ',')}`}

              </TableCell>
              {isCheckout && (
                <TableCell align="center">
                  <Tooltip title="Remover">
                    <IconButton
                      onClick={ () => remove(product.id) }
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={ isCheckout ? MAX_COL : MIN_COL } />
            <TableCell
              sx={ { fontWeight: 700, fontSize: 20 } }
              align="center"
            >
              Total
            </TableCell>
            <TableCell
              align="center"
              sx={ { fontSize: 18 } }
            >
              {isCheckout ? `R$ ${total.toFixed(2).replace('.', ',')}`
                : `R$ ${totalValue.toFixed(2).replace('.', ',')}`}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CheckoutTable.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
    url: PropTypes.string,
  })).isRequired,
  totalValue: PropTypes.number,
  remove: PropTypes.func.isRequired,
  isCheckout: PropTypes.bool.isRequired,
  ROUTE: PropTypes.string.isRequired,
};

CheckoutTable.defaultProps = {
  totalValue: 0,
};
