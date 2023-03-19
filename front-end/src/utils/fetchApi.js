import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

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

const createUser = async ({ name, email, password, role }) => {
  try {
    const result = await api.post('/register', { name, email, password, role });
    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

const createUserByAdmin = async (token, { name, email, password, role }) => {
  try {
    const result = await api.post(
      '/admin/manage',
      { name, email, password, role },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

const getSeller = async () => {
  try {
    const result = await api.get('/seller');
    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

const getUsers = async () => {
  try {
    const result = await api.get('/admin/manage');
    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

const getProducts = async (token) => {
  try {
    const result = await api.get('/customer/products', {
      headers: {
        Authorization: token,
      },
    });
    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

const newSale = async ({ saleData, token, products }) => {
  try {
    const result = await api.post('/sales', {
      saleData, products,
    }, { headers: { Authorization: token } });
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

const updateSaleStatus = async ({ id, status, token }) => {
  try {
    const result = await api.put(
      `/sales/${id}`,
      { status },
      { headers: { Authorization: token } },
    );
    return result.data;
  } catch (error) {
    return error.toJSON();
  }
};

const deleteUser = async (token, id) => {
  try {
    const result = await api.delete(
      `/admin/${id}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return result;
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
  updateSaleStatus,
  createUserByAdmin,
  getUsers,
  deleteUser,
};
