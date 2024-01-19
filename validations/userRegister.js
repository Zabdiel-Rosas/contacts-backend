const joi = require('joi')
const inputValidationsHandler = require('../middlewares/inputValidationsHandler')
const { validateEmailUniqueness } = require('../services/userService')

const validateUserEmail = async (value, helpers) => {
  const emailIsUnique = await validateEmailUniqueness(value)

  if (!emailIsUnique) {
    return helpers.message('Email already exist!')
  }
}

const schema = joi.object({
  username: joi.string().required().min(3).max(60),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .external(validateUserEmail),
  password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,64}$')),
  // repeatPassword: joi.ref('password'),
})

const registerUserValidation = async (req, res, next) => {
  return inputValidationsHandler(req, res, next, schema)
}

module.exports = registerUserValidation
