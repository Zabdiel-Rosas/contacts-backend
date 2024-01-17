const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const config = require('../config/index')

//@desc Register User
//@route POST /api/users/register
//@access public
const userRegisterHandler = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  })

  res.status(201).json({ _id: user.id, email: user.email })
})

//@desc Login User
//@route POST /api/users/login
//@access public
const userLoginHandler = asyncHandler(async (req, res) => {
  const { user } = req
  const accessToken = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    },
    config.get('auth').secret,
    { expiresIn: config.get('auth').expiration }
  )
  res.status(200).json({ accessToken })
})

//@desc Current User Information
//@route GET /api/users/current
//@access private
const userCurrentHandler = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

module.exports = {
  userRegisterHandler,
  userLoginHandler,
  userCurrentHandler,
}
