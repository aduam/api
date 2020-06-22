const Sequelize = require('sequelize');
const sequelize = require('../db');

const Liked = sequelize.define('likes', {
  id_post: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  id_owner_post: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  id_liked_post: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  liked: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
}, { timestamps: false })

module.exports = Liked;