const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const findByProperty = async (name, value) => {
  return await User.findOne({ [name]: value })
}

const validateEmailUniqueness = async (email) => {
  const emailExists = await User.findOne({ email })
  return emailExists === null
}

const validateUserPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword)
}

module.exports = {
  findByProperty,
  validateEmailUniqueness,
  validateUserPassword,
}
