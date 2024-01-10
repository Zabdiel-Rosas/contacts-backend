const express = require('express')
const router = require('../routes/index')
const errorHandler = require('../middlewares/errorHandler')
const connectDb = require('../config/dbConnection')
const dotenv = require('dotenv')

const getApp = () => {
  dotenv.config()
  connectDb()
  const app = express()
  const port = process.env.PORT || 3000

  //middlewares
  app.use(express.json())
  app.use(router)
  app.use(errorHandler)

  return { app, port }
}

module.exports = getApp
