const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  description: DataTypes.STRING,
  category: DataTypes.STRING,
  stock: DataTypes.INTEGER,
  image: DataTypes.STRING
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;
