const Router = require('express');
const { newSale, getSaleById } = require('../Controller/sale.controller');

const route = Router();

route.post('/sales', newSale);
route.get('/sales/:id', getSaleById);

module.exports = route;
