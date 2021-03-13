import { NextFunction, Request, Response } from "express"
import Tweettest from '../models/tweettest'

import axios from 'axios'

/**
 * CRUD CONTROLLERS
 */
const createOne = async (req:Request, res:Response, next:NextFunction) => {
  console.log('createOne: [POST] /tweets/')
  try {
    const { data } = await axios
    .get('http://twitterclient:3003/api/tweets/statusesUserTimeline/natterstefan')

    const result = data[0]
    const TWEET_MODEL = {
      // TODO: change Tweettest id type to BigInt
      // id: result.id,
      id: Math.floor(Math.random() * 10) + 1,
      text: result.text,
      created: result.created_at,
    }

    const tweet = await Tweettest.create(TWEET_MODEL)
    console.log('OK createOne TWEET: ', tweet)

    return res.status(201).json(tweet)
  } catch (error) {
    console.log('ERROR in createOne ' + 'TWEET:', error)
      return res.status(500).json(error)
  }
}

//GET-ALL
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  console.log('getAll: [GET] /tweets/')

  try {
    const response = await axios
    .get('http://twitterclient:3003/api/tweets/statusesUserTimeline/natterstefan')
  
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
  getAll
}