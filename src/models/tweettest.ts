import Sequelize from 'sequelize'
import db from '../util/database'

const Tweettest = db.define('tweettests', {
  id: {
    type: Sequelize.TEXT,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  created: {
    type: Sequelize.DATE,
    allowNull: false
  },
  retweet_count: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  favorite_count: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

export default Tweettest