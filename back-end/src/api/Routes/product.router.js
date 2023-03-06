const Router = require('express');
const { getAllProducts } = require('../Controller/product.controller');

const route = Router();

route.get('/customer/products', getAllProducts);

module.exports = route;
