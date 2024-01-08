const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const validateToken = asyncHandler(async (req, res, next) => {
  let token
  let authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]

    //verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401)
        throw new Error('User Is Not Authorized!')
      }
      //embed token payload into request
      req.user = decoded.user
      next()
    })
  }

  res.status(401)
  throw new Error('Authentication Token Is Missing!')
})

module.exports = validateToken
