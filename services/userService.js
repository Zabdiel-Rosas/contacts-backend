import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

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

export { findByProperty, validateEmailUniqueness, validateUserPassword }
