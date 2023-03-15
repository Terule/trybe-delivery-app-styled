import React from 'react';
import { shape, number, string, func } from 'prop-types';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  TextField } from '@mui/material';
import Remove from '@mui/icons-material/Remove';
import Add from '@mui/icons-material/Add';
// import { useHistory } from 'react-router-dom';

function ProductCard({ product, minusClick, plusClick, handleChange }) {
  return (
    <Grid item xs={ 4 }>
      <Card
        elevation={ 3 }
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
        } }
      >
        <CardHeader
          title={ product.name }
          subheader={ `R$ ${product.price.replace('.', ',')}` }
        />
        <CardMedia
          component="img"
          image={ product.urlImage }
          sx={ { height: 200, objectFit: 'contain' } }
        />
        <CardActions sx={ { alignSelf: 'center', marginTop: '10px' } }>
          <IconButton
            onClick={ () => minusClick(product.id) }
          >
            <Remove />
          </IconButton>
          <TextField
            size="small"
            value={ product.quantity }
            onChange={ (e) => handleChange(e, product.id) }
            sx={ { width: '50px', marginLeft: 1 } }
            inputProps={ { style: { textAlign: 'center' } } }
          />
          <IconButton
            onClick={ () => plusClick(product.id) }
          >
            <Add />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

ProductCard.propTypes = {
  product: shape({
    id: number,
    name: string,
    price: string,
    urlImage: string,
    quantity: number,
  }).isRequired,
  minusClick: func.isRequired,
  plusClick: func.isRequired,
  handleChange: func.isRequired,
};

export default ProductCard;
