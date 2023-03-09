const Router = require('express');
const {
  login, register, getSeller, registerByAdmin, getUsers, deleteUser,
} = require('../Controller/user.controller');

const route = Router();

route.post('/login', login);
route.post('/register', register);
route.post('/admin/manage', registerByAdmin);
route.get('/seller', getSeller);
route.get('/admin/manage', getUsers);
route.delete('/admin/:id', deleteUser);

module.exports = route;
