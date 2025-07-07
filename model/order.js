const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  userId: DataTypes.INTEGER,
  totalAmount: DataTypes.FLOAT,
  paymentStatus: DataTypes.STRING
}, {
  tableName: 'orders',
  timestamps: false
});

module.exports = Order;
