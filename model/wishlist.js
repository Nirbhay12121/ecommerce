const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Wishlist = sequelize.define('Wishlist', {
  userId: DataTypes.INTEGER,
  productId: DataTypes.INTEGER
}, {
  tableName: 'wishlist',
  timestamps: false
});

module.exports = Wishlist;
