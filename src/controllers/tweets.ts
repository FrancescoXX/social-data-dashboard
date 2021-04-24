import { NextFunction, Request, Response } from 'express'
import Tweettest from '../models/tweettest'

import axios from 'axios'
import { addTweets } from '../twitter/addTweets'

/**
 * CRUD CONTROLLERS
 */
const createOne = async (req: Request, res: Response, next: NextFunction) => {
  console.log('createOne: [POST] /tweets/')
  console.log('CREATING FOR ' + req.body.username)
  try {
    const bulkResponse = await addTweets(req.body.username)
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
      'http://twitterclient:3003/api/tweets/statusesUserTimeline/' +
        req.params.username,
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
