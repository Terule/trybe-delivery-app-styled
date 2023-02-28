'use strict'

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
}, {
    timestamps: false,
    underscored: true,
    tableName: 'users',
    });

  users.associate = (models) => {
    users.hasMany(models.Sale, {
      as: 'salesBuyer',
      foreignKey: 'userId'
      });
    users.hasMany(models.Sale, {
      as: 'salesSeller',
      foreignKey: 'sellerId'
    });
  };

  return users;
}
