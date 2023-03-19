const { Product } = require('../../database/models');

const findAllProducts = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = {
  findAllProducts,
};
