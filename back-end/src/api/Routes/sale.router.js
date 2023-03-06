const Router = require('express');
const { newSale } = require('../Controller/sale.controller');

const route = Router();

route.post('/sales', newSale);

module.exports = route;