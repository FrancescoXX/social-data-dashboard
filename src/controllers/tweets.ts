import { NextFunction, Request, Response } from 'express'
import Tweettest from '../models/tweettest'

import axios from 'axios'

// ATTENTION: partial typing of the twitter api response
type TweetResponse = {
  id_str: string
  text: string
  created_at: Date
}

/**
 * CRUD CONTROLLERS
 */
const createOne = async (req: Request, res: Response, next: NextFunction) => {
  console.log('createOne: [POST] /tweets/')
  try {
    const { data } = await axios.get<TweetResponse[]>(
      'http://twitterclient:3003/api/tweets/statusesUserTimeline/FrancescoCiull4',
    )

    const tweets = data.map(tweet => ({
        id: tweet.id_str,
        text: tweet.text,
        created: tweet.created_at,
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
  console.log('getAll: [GET] /tweets/')

  try {
    const response = await axios.get(
      'http://twitterclient:3003/api/tweets/statusesUserTimeline/FrancescoCiull4',
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
