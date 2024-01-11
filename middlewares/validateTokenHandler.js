const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const config = require('../config/index')

const validateToken = asyncHandler(async (req, res, next) => {
  let token
  let authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]

    //verify token
    jwt.verify(token, config.get('auth').secret, (err, decoded) => {
      if (err) {
        res.status(401)
        throw new Error('User Is Not Authorized!')
      }
      //embed token payload into request
      req.user = decoded.user
      next()
    })
  } else {
    res.status(401)
    throw new Error('Authorization Token Is Missing!')
  }
})

module.exports = validateToken
