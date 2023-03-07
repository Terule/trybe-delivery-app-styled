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


const getSaleById = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
    include: [
      { model: SaleProduct, as: 'products', attributes: ['name', 'quantity', 'url_image'] },
    ],
  });
  return sale;
}

const getAllSales = async () => {
  const sales = await Sale.findAll();
  return sales;
};

module.exports = {
  newSale,
  getAllSales,
  getSaleById,
};
