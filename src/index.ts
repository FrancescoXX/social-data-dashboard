import express from 'express'
import bodyParser from 'body-parser'

import sequelize from './util/database' // database and sequelize initializations
import User from './models/users' // REQUIRED even if IDE says not used!
import Tweet from './models/tweets' // REQUIRED even if IDE says not used!
import Tweettest from './models/tweettest' // REQUIRED even if IDE says not used!

// INITIALIZE APP WITH EXPRESS
const app = express()

// BODYPARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Set proper Headers on Backend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// ROUTES
app.use('/dev', require('./routes/dev')) // All test routes are placed here
app.use('/users', require('./routes/users'))
app.use('/tweets', require('./routes/tweets'))

const start = async () => {
  try {
    await sequelize.sync(
      { force: true }, // Reset db every time
    )
    app.listen(process.env.EXTERNAL_PORT, () => {
      console.log('I am running!')
    }) // DEF in docker.compose.yml
  } catch (error) {
    console.log(error)
  }
}

start()
