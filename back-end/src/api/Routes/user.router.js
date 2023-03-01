const Router = require('express');
const { login, register } = require('../Controller/user.controller');

const route = Router();

route.post('/login', login);
route.post('/register', register);

module.exports = route;
