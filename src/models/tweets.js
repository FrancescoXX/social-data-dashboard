const Sequelize = require('sequelize')
const db = require('../util/database')

const Tweet = db.define('tweets', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  retweets: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Tweet