'use strict'

module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'sales_products',
  });

  salesProducts.associate = (models) => {
    salesProducts.belongsTo(models.sales, {
      as: 'sales',
      foreignKey: 'saleId',
    });
    salesProducts.belongsTo(models.products, {
      as: 'products',
      foreignKey: 'productId',
    });
  };

  return salesProducts;
}
