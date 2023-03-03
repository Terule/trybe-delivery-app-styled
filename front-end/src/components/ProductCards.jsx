import React, { useEffect, useState, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { getProducts } from '../utils/fetchApi';

const ROUTE = 'customer_products_';
const CARD_TITLE = '_element-card-title';
const CARD_PRICE = '_element-card-price';
const CARD_IMAGE = '_img-card-bg-image';
const CARD_ADD = '_button-card-add-item';
const CARD_REMOVE = '_button-card-rm-item';
const CARD_INPUT = '_input-card-quantity';

function ProductCards() {
  const [productsData, setProductsData] = useState([]);
  const { user } = useContext(AppContext);
  // const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts(user.token);
      setProductsData(products);
      return products;
    };
    fetchProducts();
  }, []);

  const productsHtmlElements = productsData.map((product) => (
    <div key={ product.id }>
      <div>
        <span data-testid={ `${ROUTE}${CARD_PRICE}-${product.id}` }>{product.price}</span>
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
        >
          Remove
        </button>
        <input type="text" data-testid={ `${ROUTE}${CARD_INPUT}-${product.id}` } />
        <button
          type="button"
          data-testid={ `${ROUTE}${CARD_ADD}-${product.id}` }
        >
          Add
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      { productsHtmlElements }
    </div>
  );
}

export default ProductCards;
