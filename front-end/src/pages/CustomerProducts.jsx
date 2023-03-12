import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import AppContext from '../context/AppContext';
import { getProducts } from '../utils/fetchApi';

const ROUTE = 'customer_products';
const CHECKOUT_VALUE = 'checkout-bottom-value';

function CustomerProducts() {
  const [productsData, setProductsData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const { user, setCart } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts(user.token);
      products.forEach((product) => {
        product.quantity = 0;
      });
      setProductsData(products);
      return products;
    };
    fetchProducts();
  }, []); // eslint-disable-line

  useEffect(() => {
    const validateQuantity = () => {
      const result = productsData.some((product) => product.quantity > 0);

      if (result) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    validateQuantity();
  }, [productsData]);

  const plusClick = (id) => {
    const product = productsData.find((item) => item.id === Number(id));
    product.quantity += 1;
    setProductsData([...productsData]);
  };

  const minusClick = (id) => {
    const product = productsData.find((item) => item.id === Number(id));
    if (product.quantity > 0) {
      product.quantity -= 1;
      setProductsData([...productsData]);
    } else {
      product.quantity = 0;
      setProductsData([...productsData]);
    }
  };

  const handleChange = (e, id) => {
    const product = productsData.find((item) => item.id === Number(id));
    product.quantity = Number(e.target.value);
    setProductsData([...productsData]);
  };

  const total = productsData.reduce((acc, { price, quantity }) => {
    const totalValue = price * quantity;
    return acc + totalValue;
  }, 0);

  const onSubmit = () => {
    const products = productsData.filter((product) => product.quantity > 0);
    setCart(products);
    navigate('/customer/checkout');
  };

  return (
    <div>
      <NavBar />
      <div>
        <button
          type="button"
          onClick={ onSubmit }
          disabled={ isDisabled }
          data-testid="customer_products__button-cart"
        >
          {'Ver Carrinho: R$ '}
          <span
            data-testid={ `${ROUTE}__${CHECKOUT_VALUE}` }
          >
            { total.toFixed(2).replace('.', ',') }
          </span>

        </button>
      </div>
      {productsData.map((product) => (
        <ProductCard
          key={ product.id }
          product={ product }
          minusClick={ minusClick }
          plusClick={ plusClick }
          handleChange={ handleChange }
        />
      ))}
    </div>
  );
}

export default CustomerProducts;
