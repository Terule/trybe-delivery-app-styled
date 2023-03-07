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

const newSale = async ({ saleData, token, products }) => {
  try {
    const result = await api.post('/sales', {
      saleData, products }, { headers: { Authorization: token } });
    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

const getAllSales = async () => {
  try {
    const result = await api.get('/customer/orders');
    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

const getSaleById = async ({ id, token }) => {
  try {
    const result = await api.get(`/sales/${id}`, { headers: { Authorization: token } });

    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

export {
  userLogin,
  createUser,
  getProducts,
  getSeller,
  getAllSales,
  newSale,
  getSaleById,
};
