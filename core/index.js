import express from 'express'
import router from '../routes/index.js'
import errorHandler from '../middlewares/errorHandler.js'
import connectDb from '../db/dbConnection.js'

const getApp = () => {
  connectDb()
  const app = express()

  //middlewares
  app.use(express.json())
  app.use(router)
  app.use(errorHandler)

  return app
}

export default getApp
