import { NextFunction, Response, Request } from "express"

import packJson from '../../package.json'
import sequelize from '../util/database'

// [GET] ../dev/config
const getConfig = (req: Request, res: Response, next:NextFunction) => {
  return res.status(200).json({ packJson })
}

// [GET] ../dev/version
const getVersion = (req: Request, res:Response, next:NextFunction) => {
  return res.status(200).json({ appVersion: 'dummy' })
}

// [GET] ../dev/seq
const seq = async (req: Request, res:Response, next:NextFunction) => {
  try {
    await sequelize.authenticate()
    console.log('Sequelize Connection established')
    res.status(200).json('Sequelize Connection established')
    next()
  } catch (error) {
    next(error)
  }
}

export default {
  getConfig,
  getVersion,
  seq
}