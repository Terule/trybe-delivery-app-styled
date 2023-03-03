import jwt from 'jwt-decode';

const verifyToken = (token) => {
  try {
    const payload = jwt(token);
    return payload;
  } catch (e) {
    throw new InvalidToken('Invalid token');
  }
};

export default verifyToken;
