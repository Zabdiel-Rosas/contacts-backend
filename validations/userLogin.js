import Joi from 'joi'
import inputValidationsHandler from '../middlewares/inputValidationsHandler.js'
import { findByProperty } from '../services/userService.js'

const validateUserEmail = async (value, helpers) => {
  const user = await findByProperty('email', value)

  if (!user) {
    return helpers.message('User does not exist!')
  }
}

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .external(validateUserEmail),
  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,64}$')),
})

const loginUserValidation = async (req, res, next) => {
  return inputValidationsHandler(req, res, next, schema)
}

export default loginUserValidation
