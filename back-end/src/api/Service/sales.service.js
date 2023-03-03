const { Sales } = require('../../database/models');

 const getAllSales = async () => {
    const sales = await Sales.findAll();
    return sales;
};

module.exports = {
    getAllSales,
};