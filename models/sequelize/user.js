const Sequelize = require('sequelize');

const sequelize = require('../util/databse');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;
