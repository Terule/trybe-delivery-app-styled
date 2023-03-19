const { verifyToken } = require('../../utils/jwt');
const productService = require('../Service/product.service');

const getAllProducts = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    verifyToken(token);
    const products = await productService.findAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
};
