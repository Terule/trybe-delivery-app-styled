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

export default userLogin;
