const joi = require('joi')
const inputValidationsHandler = require('../middlewares/inputValidationsHandler')
const { findByProperty } = require('../services/userService')

const validateUserEmail = async (value, helpers) => {
  const user = await findByProperty('email', value)

  if (!user) {
    return helpers.message('User does not exist!')
  }
}

const schema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .external(validateUserEmail),
  password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,64}$')),
})

const loginUserValidation = async (req, res, next) => {
  return inputValidationsHandler(req, res, next, schema)
}

module.exports = loginUserValidation
