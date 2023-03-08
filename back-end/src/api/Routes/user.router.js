const Router = require('express');
const { login, register, getSeller, registerByAdmin } = require('../Controller/user.controller');

const route = Router();

route.post('/login', login);
route.post('/register', register);
route.post('/admin/manage', registerByAdmin);
route.get('/seller', getSeller);

module.exports = route;
