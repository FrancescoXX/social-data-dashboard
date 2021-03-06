const Sequelize = require('sequelize')
const db = require('../util/database')

const Tweettest = db.define('tweettests', {
  id: {
    // TODO: use BigInt instead, because ID's are longer than Integers
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  created: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Tweettest