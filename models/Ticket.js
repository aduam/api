const Sequelize = require('sequelize');
const sequelize = require('../db');

const Ticket = sequelize.define('tickets', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  full_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  change: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
  updated_at: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
  active: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
  id_person: {
    type: Sequelize.INTEGER,
  },
}, { timestamps: false });

module.exports = Ticket;