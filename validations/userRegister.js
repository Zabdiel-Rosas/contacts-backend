import Joi from 'joi'
import inputValidationsHandler from '../middlewares/inputValidationsHandler.js'
import { validateEmailUniqueness } from '../services/userService.js'

const validateUserEmail = async (value, helpers) => {
  const emailIsUnique = await validateEmailUniqueness(value)

  if (!emailIsUnique) {
    return helpers.message('Email already exist!')
  }
}

const schema = Joi.object({
  username: Joi.string().required().min(3).max(60),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .external(validateUserEmail),
  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,64}$')),
  // repeatPassword: joi.ref('password'),
})

const registerUserValidation = async (req, res, next) => {
  return inputValidationsHandler(req, res, next, schema)
}

export default registerUserValidation
