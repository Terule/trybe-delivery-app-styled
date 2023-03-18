import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';

function CheckoutList({ products, isCheckout, remove }) {
  return (
    <List component={ Paper } elevation={ 0 } sx={ { display: { md: 'none' } } }>
      {products.map((product, index) => (
        <Box key={ product.id }>
          <ListItem key={ product.id }>
            <ListItemAvatar>
              <Avatar alt={ product.name } src={ product.urlImage } />
            </ListItemAvatar>
            <ListItemText
              primary={ product.name }
              secondary={
                <>
                  <Typography
                    sx={ { display: 'inline' } }
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`Valor unitário: R$ ${product.price}`}
                  </Typography>
                  <br />
                  <Typography
                    sx={ { display: 'inline' } }
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`Quantidade: ${product.SaleProduct.quantity}`}
                  </Typography>
                  <br />
                  {`Sub-Total: ${(product.SaleProduct.quantity * product.price)
                    .toFixed(2)}`}
                </>
              }
            >
              {product.name}
            </ListItemText>
            {isCheckout && (
              <ListItemButton
                sx={ {
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  height: '76px',
                } }
              >
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={ () => remove(product.id) }
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItemButton>
            )}
          </ListItem>
          {index !== products.length - 1 && <Divider variant="inset" component="li" />}
        </Box>
      ))}
    </List>
  );
}

CheckoutList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isCheckout: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
};

export default CheckoutList;
