const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const throwCustomError = require('./throwCustomError')

const findByProperty = async (name, value) => {
  const user = await User.findOne({ [name]: value })
  return user
}

const validateUserExistance = (user) => {
  if (!user) {
    throwCustomError(404, "User wasn't found!")
  }
}

const validateEmailUniqueness = async (email) => {
  const emailExists = await User.findOne({ email })

  if (emailExists) {
    throwCustomError(400, 'The email you sent is already registered!')
  }
}

const validateUserPassword = async (password, userPassword) => {
  const passwordIsValid = await bcrypt.compare(password, userPassword)

  if (!passwordIsValid) {
    throwCustomError(400, 'Incorrect Password!')
  }
}

module.exports = {
  findByProperty,
  validateUserExistance,
  validateEmailUniqueness,
  validateUserPassword,
}
