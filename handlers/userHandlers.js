import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import config from '../config/index.js'
import {
  findByProperty,
  validateUserPassword,
} from '../services/userService.js'

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
  const user = await findByProperty('email', req.body.email)

  const validCredentials = await validateUserPassword(
    req.body.password,
    user.password
  )

  if (!user || !validCredentials) {
    res.status(401).json({
      parameter: 'Password',
      message: 'Incorrect Password!',
      type: 'Input',
    })
    return
  }

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

export { userRegisterHandler, userLoginHandler, userCurrentHandler }
