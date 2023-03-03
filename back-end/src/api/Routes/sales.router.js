const Router = require('express');
const { getAllSales } = require('../Controller/sales.controller');

const route = Router();

route.get('/customer/orders', getAllSales);

module.exports = route;