const { Sale, SaleProduct, Product, User } = require('../../database/models');

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
  try {
    const sale = await Sale.findOne({
      where: { id },
      include: [
        { model: Product, as: 'products', through: { attributes: ['quantity'] } },
        { model: User, as: 'seller', attributes: ['name'] },
      ],
    });
    return sale.dataValues;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  newSale,
  getSaleById,
};
