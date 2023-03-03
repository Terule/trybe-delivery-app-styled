import React from 'react';
import { shape, number, string, func } from 'prop-types';
// import { useHistory } from 'react-router-dom';

const ROUTE = 'customer_products_';
const CARD_TITLE = '_element-card-title';
const CARD_PRICE = '_element-card-price';
const CARD_IMAGE = '_img-card-bg-image';
const CARD_ADD = '_button-card-add-item';
const CARD_REMOVE = '_button-card-rm-item';
const CARD_INPUT = '_input-card-quantity';

function ProductCard({ product, minusClick, plusClick, handleChange }) {
  return (
    <>
      <div id={ product.id }>
        <span
          data-testid={ `${ROUTE}${CARD_PRICE}-${product.id}` }
        >
          {product.price.replace('.', ',')}
        </span>
        <img
          src={ product.urlImage }
          data-testid={ `${ROUTE}${CARD_IMAGE}-${product.id}` }
          alt={ product.name }
        />
      </div>
      <div>
        <span data-testid={ `${ROUTE}${CARD_TITLE}-${product.id}` }>{product.name}</span>
        <button
          type="button"
          data-testid={ `${ROUTE}${CARD_REMOVE}-${product.id}` }
          onClick={ () => minusClick(product.id) }
        >
          -
        </button>
        <input
          type="text"
          data-testid={ `${ROUTE}${CARD_INPUT}-${product.id}` }
          value={ product.quantity }
          onChange={ (e) => handleChange(e, product.id) }
        />
        <button
          type="button"
          data-testid={ `${ROUTE}${CARD_ADD}-${product.id}` }
          onClick={ () => plusClick(product.id) }
        >
          +
        </button>
      </div>
    </>
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
