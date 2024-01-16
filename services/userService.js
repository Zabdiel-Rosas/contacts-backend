const User = require('../models/userModel')
const errorHandler = require('../middlewares/errorHandler')
const bcrypt = require('bcrypt')

const validateUserRegister = async (req, res, next) => {
  try {
    const { email } = req.body
    const emailExists = await User.findOne({ email })

    if (emailExists) {
      res.status(400)
      throw new Error('Email Already Exists!')
    }
    next()
  } catch (error) {
    errorHandler(error, req, res)
  }
}

const validateUserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user) {
      const passwordIsValid = await bcrypt.compare(password, user.password)

      if (!passwordIsValid) {
        res.status(400)
        throw new Error('Incorrect Password!')
      }

      req.user = user
      next()
    } else {
      res.status(400)
      throw new Error(`User with email ${email} doesn't exist!`)
    }
  } catch (error) {
    errorHandler(error, req, res)
  }
}

module.exports = {
  validateUserRegister,
  validateUserLogin,
}
