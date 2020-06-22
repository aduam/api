const Sequelize = require('sequelize');
const sequelize = require('../db');

const Person = sequelize.define('posts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
}, { timestamps: false })

module.exports = Person;