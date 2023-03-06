const Router = require('express');
const { newSale, getAllSales } = require('../Controller/sale.controller');

const route = Router();

route.post('/sales', newSale);




route.get('/customer/orders', getAllSales);

module.exports = route;