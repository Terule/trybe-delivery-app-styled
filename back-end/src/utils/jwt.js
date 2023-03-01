const fs = require('fs');
const jwt = require('jsonwebtoken');
const InvalidToken = require('./errors/invalidToken');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8').trim();

const createToken = (data) => {
    const token = jwt.sign({ data }, secret, { 
        algorithm: 'HS256',
        expiresIn: '7d',
    });

    return token;
};

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, secret);
        return payload;
    } catch (e) {
        throw new InvalidToken('Invalid token');
    }
};

module.exports = {
    createToken,
    verifyToken,
};