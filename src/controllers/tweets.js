const Tweet = require('../models/tweets')//CREATE-ONE


/**
 * CRUD CONTROLLERS
 */
exports.createOne = async (req, res, next) => {
  console.log('createOne: [POST] /tweets/')
  try {
    const TWEET_MODEL = {
      id: req.body.id,
      text: req.body.text,
      likes: req.body.likes,
      retweets: req.body.retweets,
    }

    try {
      const tweet = await Tweet.create(TWEET_MODEL)
      console.log('OK createOne TWEET: ', tweet)
      return res.status(201).json(tweet)
    } catch (error) {
      console.log('ERROR in createOne ' + 'TWEET:', error)
      return res.status(500).json(error)
    }
  } catch (error) {
    return res.status(400).json('Bad Request')
  }
}

//GET-ALL
exports.getAll = async (req, res, next) => {
  console.log('getAll: [GET] /tweets/')
  try {
    const ALL = await Tweet.findAll()
    console.log(
      'OK getAll TWEET: ',
      ALL.map(el => el.dataValues),
    )
    return res.status(200).json(ALL)
  } catch (error) {
    console.log('ERROR in getAll ' + 'TWEET:', error)
    return res.status(500).json(error)
  }
}
