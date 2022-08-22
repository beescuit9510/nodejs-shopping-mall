const Sequelize = require('sequelize');

const sequelize = require('../util/databse');

const OrderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.DataTypes.INTEGER,
});

module.exports = OrderItem;
