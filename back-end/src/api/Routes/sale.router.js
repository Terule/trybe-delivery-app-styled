const Router = require('express');
const { newSale,
         getAllSales,
         getSaleById,
         getSaleBySellerId,
      } = require('../Controller/sale.controller');

const route = Router();

route.post('/sales', newSale);

route.get('/sales', getSaleBySellerId);

route.get('/sales/:id', getSaleById);

route.get('/customer/orders', getAllSales);

module.exports = route;
