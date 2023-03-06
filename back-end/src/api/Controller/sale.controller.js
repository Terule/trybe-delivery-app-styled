const { verifyToken } = require('../../utils/jwt');
const saleService = require('../Service/sale.service');

const newSale = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(req.headers);
    verifyToken(token);
    const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber } = req.body;
    const sale = await saleService.newSale(
      { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber },
      );
    return res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
    newSale,
};
