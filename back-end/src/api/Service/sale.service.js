const { Sale } = require('../../database/models');

const newSale = async ({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber }) => {
   const sale = await Sale.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
   });

   return sale.id;
};

module.exports = {
  newSale,
};