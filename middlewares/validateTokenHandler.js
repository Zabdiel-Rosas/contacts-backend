import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import config from '../config/index.js'

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

export default validateToken
