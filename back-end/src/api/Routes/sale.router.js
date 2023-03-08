const Router = require('express');
const { newSale,
         getAllSales,
         getSaleById,
         getSaleBySellerId,
         updateSaleStatus,
      } = require('../Controller/sale.controller');

const route = Router();

route.post('/sales', newSale);

route.get('/sales', getSaleBySellerId);

route.get('/sales/:id', getSaleById);

route.get('/customer/orders', getAllSales);

route.put('/sales/:id', updateSaleStatus)

module.exports = route;
