const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', '9510', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
