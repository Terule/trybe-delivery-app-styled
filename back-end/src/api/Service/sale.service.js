const { Sale, SaleProduct } = require('../../database/models');

const newSale = async (
  { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber }, products) => {
   const sale = await Sale.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status: 'Pendente',
   });
   products.forEach(async (product) => {
      await SaleProduct.create(
        { saleId: sale.id, productId: product.id, quantity: product.quantity },
      );
   });
   return sale.id;
};
























const getAllSales = async () => {
  const sales = await Sale.findAll();
  console.log(sales);
  return sales;
};

module.exports = {
  newSale,
  getAllSales,
};