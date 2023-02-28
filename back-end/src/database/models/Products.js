'use strict'

module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      },
    price: {
        type: DataTypes.DECIMAL(4,2),
        allowNull: false,
      },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
      }
    }, {
      timestamps: false,
      underscored: true,
      tableName: 'products',
    });

  return products;
}
