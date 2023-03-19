import jwt from 'jwt-decode';

const verifyToken = (token) => {
  try {
    const payload = jwt(token);
    return payload;
  } catch (e) {
    throw new Error('Invalid token');
  }
};

export default verifyToken;
