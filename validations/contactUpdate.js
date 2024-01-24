import Joi from 'joi'
import inputValidationsHandler from '../middlewares/inputValidationsHandler.js'
import { validateEmailUniqueness } from '../services/contactService.js'

const validateContactEmail = async (value, helpers) => {
  const emailIsUnique = await validateEmailUniqueness(value)

  if (!emailIsUnique) {
    return helpers.message('Email already exists!')
  }
}

const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/

const schema = Joi.object({
  name: Joi.string().min(3).max(60),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .external(validateContactEmail),
  phone: Joi.string().regex(phoneRegex),
})

const contactUpdateValidation = async (req, res, next) => {
  return inputValidationsHandler(req, res, next, schema)
}

export default contactUpdateValidation
