const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//@desc Register User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory!')
  }
  const emailExist = await User.findOne({ email })

  if (emailExist) {
    res.status(400)
    throw new Error('Email already registered!')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email })
  } else {
    res.status(400)
    throw new Error('User data is not valid!')
  }
})

//@desc Login User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory!')
  }

  const user = await User.findOne({ email })
  const passwordIsValid = await bcrypt.compare(password, user.password)

  if (user && passwordIsValid) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15min' }
    )
    res.status(201).json({ accessToken })
  } else {
    res.status(400)
    throw new Error('Email or Password is not valid!')
  }
})

//@desc Current User Information
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Current User Information' })
})

module.exports = {
  registerUser,
  loginUser,
  currentUser,
}
