const errorHandler = require('./errorHandler')
const {
  findByProperty,
  validateUserExistance,
  validateEmailUniqueness,
  validateUserPassword,
} = require('../services/userService')

const validateUserRegister = async (req, res, next) => {
  try {
    await validateEmailUniqueness(req.body.email)
    next()
  } catch (err) {
    errorHandler(err, req, res)
  }
}

const validateUserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await findByProperty('email', email)
    validateUserExistance(user)

    await validateUserPassword(password, user.password)

    req.user = user
    next()
  } catch (err) {
    errorHandler(err, req, res)
  }
}

module.exports = {
  validateUserRegister,
  validateUserLogin,
}
