import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const userLogin = async ({ email, password }) => {
  try {
    const result = await api.post('/login', { email, password });
    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

const createUser = async ({ name, email, password }) => {
  try {
    const result = await api.post('/register', { name, email, password });
    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

const getSeller = async () => {
  try {
    const result = await api.get('/user');
    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

const getProducts = async (token) => {
  try {
    const result = await api.get('/customer/products', { headers: {
      Authorization: token,
    } });
    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

const newSale = async ({
  sellerName,
  deliveryAddress,
  deliveryNumber, userId, totalPrice, sellerId }, token) => {
  try {
    const result = await api.post('/sales', {
      sellerName,
      deliveryAddress,
      deliveryNumber,
      userId,
      totalPrice,
      sellerId }, { headers: { Authorization: token } });
    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

export { userLogin, createUser, getProducts, getSeller, newSale };
