const Sequelize = require('sequelize');
const sequelize = require('../db');

const Person = sequelize.define('people', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  names: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  surnames: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isEmail:true
    },
  },
  phone: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
}, { timestamps: false })

module.exports = Person;