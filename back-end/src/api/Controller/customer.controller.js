const customerService = require('../Service/customer.service');

const getAllProducts = async (req, res, next) => {
    try {
        const products = await customerService.findAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
};
