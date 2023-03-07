const jwt = require('jsonwebtoken');
const jwtKey = require('fs')
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

const InvalidToken = require('./errors/invalidToken');

const createToken = (data) => {
    const token = jwt.sign(data, jwtKey, { 
        algorithm: 'HS256',
        expiresIn: '7d',
    });

    return token;
};

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, jwtKey);
        return payload;
    } catch (e) {
        throw new InvalidToken('Invalid token');
    }
};

module.exports = {
    createToken,
    verifyToken,
};
