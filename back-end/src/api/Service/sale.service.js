const { Sale, SaleProduct, Product, User } = require('../../database/models');
const NotFoundError = require('../../utils/errors/notFoundError');

const newSale = async (
  { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber }, products) => {
   const sale = await Sale.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status: 'Pendente',
   });
   if (!sale) throw new Error('Server internal error');
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
        { model: Product, as: 'products', through: { attributes: ['quantity'] } },
        { model: User, as: 'seller', attributes: ['name'] },
      ],
    });
    if (!sale) {
      throw new NotFoundError('Not Found');
  }
  return sale.dataValues;
};

const getAllSales = async () => {
  const sales = await Sale.findAll();
  if (!sales) throw new Error('Server internal error');
  return sales;
};

// const getSaleBySellerId = async (sellerId) => {
//   const sale = await Sale.findOne({
//     where: { sellerId },
//     include: [
//       { model: Product, as: 'products', attributes: ['name', 'price', 'url_image'] },
//     ],
//   });
//   return sale;
// };

const updateSaleStatus = async (id, status) => {
  const sale = await Sale.findOne({
    where: { id },
  });
  if (!sale) throw new NotFoundError('Not Found');
  await Sale.update({ status }, { where: { id } });
};

module.exports = {
  newSale,
  getAllSales,
  getSaleById,
  updateSaleStatus,
};
