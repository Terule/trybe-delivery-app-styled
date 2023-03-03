const salesServices = require('../Service/sales.service');

const getAllSales = async () => {
    try {
        const sales = await salesServices.getAllSales();
        return res.status(200).json(sales);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllSales,
}