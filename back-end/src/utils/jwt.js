const fs = require('fs')
const jwt = require('jsonwebtoken');
const errorHandler = require('../middleware/error.middleware');

const secret = fs.readFileSync('../jwt.evaluation.key')

const createToken = (data) => {
    const token = jwt.sign({data}, secret, {
        algorithm:'HS256',
        expiresIn: '7d'
    })

    return token
}

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, secret);
        return payload

    } catch(e) {
        throw new errorHandler(401, 'Invalid token')
    }
}

module.exports = {
    createToken
}