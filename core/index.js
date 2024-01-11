const express = require('express')
const router = require('../routes/index')
const errorHandler = require('../middlewares/errorHandler')
const connectDb = require('../db/dbConnection')

const getApp = () => {
  connectDb()
  const app = express()

  //middlewares
  app.use(express.json())
  app.use(router)
  app.use(errorHandler)

  return app
}

module.exports = getApp
