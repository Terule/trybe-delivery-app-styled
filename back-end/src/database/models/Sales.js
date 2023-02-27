'use strict'

module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'sales',
    })

  sales.associate = (models) => {
    sales.belongsTo(models.users, {
      as: 'user',
      foreignKey: 'userId',
    });
    sales.belongsTo(models.users, {
      as: 'seller',
      foreignKey: 'sellerId',
    });
    sales.hasMany(models.salesProducts, {
      as: 'salesProducts',
      foreignKey: 'saleId',
    });
  }
  return sales;
}
