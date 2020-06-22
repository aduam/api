const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, { timestamps: false })

module.exports = User;