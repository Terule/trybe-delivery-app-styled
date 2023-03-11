const { verifyToken } = require('../../utils/jwt');
const saleService = require('../Service/sale.service');

const newSale = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    verifyToken(token);
    const { saleData: { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
    }, products } = req.body;
    const sale = await saleService.newSale(
      { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber },
      products,
      );
      console.log(sale);
    return res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  try {
    verifyToken(token);
    const sale = await saleService.getSaleById(id);
    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const getAllSales = async (req, res, next) => {
  try {
      const sales = await saleService.getAllSales();
      return res.status(200).json(sales);
  } catch (error) {
      next(error);
  } 
};

// const getSaleBySellerId = async (req, res, next) => {
//   try {
//     const { sellerId } = req.body;
//     const saleList = await saleService.getSaleBySellerId(sellerId);
//     res.status(200).json(saleList);
//   } catch (error) {
//     next(error);
//   }
// };

const updateSaleStatus = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    verifyToken(token);
    const { id } = req.params;
    const { status } = req.body;
    await saleService.updateSaleStatus(id, status);
    res.status(200).json({ message: 'Status atualizado com sucesso!' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    newSale,
    getAllSales,
    getSaleById,
    updateSaleStatus,
};
