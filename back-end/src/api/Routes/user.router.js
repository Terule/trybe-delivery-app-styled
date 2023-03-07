const Router = require('express');
const { login, register, getSeller } = require('../Controller/user.controller');

const route = Router();

route.post('/login', login);
route.post('/register', register);
route.get('/seller', getSeller)

module.exports = route;
