import { NextFunction, Request, Response } from 'express'
import Tweettest from '../models/tweettest'

import axios from 'axios'

// ATTENTION: partial typing of the twitter api response
type TweetResponse = {
  id_str: string
  text: string
  created_at: Date
  retweet_count: number
  favorite_count: number
  user: {
    id_str: string
  }
}

/**
 * CRUD CONTROLLERS
 */
const createOne = async (req: Request, res: Response, next: NextFunction) => {
  console.log('createOne: [POST] /tweets/')
  console.log('CREATING FOR ' + req.body.username);
  try {
    const { data } = await axios.get<TweetResponse[]>(
      'http://twitterclient:3003/api/tweets/statusesUserTimeline/' + req.body.username,
    )

    const tweets = data.map(tweet => ({
        id: tweet.id_str,
        text: tweet.text,
        created: tweet.created_at,
        retweet_count: tweet.retweet_count,
        favorite_count: tweet.favorite_count,
        userId: tweet.user.id_str,
    }))

    // docs: https://sequelize.org/master/class/lib/model.js~Model.html#static-method-bulkCreate
    const bulkResponse = await Tweettest.bulkCreate(tweets)
    return res.status(201).json(bulkResponse)
  } catch (error) {
    console.log('ERROR in createOne ' + 'TWEET:', error)
    return res.status(500).json(error)
  }
}

//GET-ALL
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  console.log('getAll: [GET] /tweets/:username')

  try {
    const response = await axios.get(
      'http://twitterclient:3003/api/tweets/statusesUserTimeline/' + req.params.username,
    )

    return res.status(200).json(response.data)

    // const ALL = await Tweettest.findAll()
    // console.log(
    //   'OK getAll Tweettest: ',
    //   ALL.map(el => el.dataValues),
    // )
    // return res.status(200).json(ALL)
  } catch (error) {
    console.log('ERROR in getAll Tweettest:', error)
    // return res.status(500).json(error)
  }
}

export default {
  createOne,
  getAll,
}
