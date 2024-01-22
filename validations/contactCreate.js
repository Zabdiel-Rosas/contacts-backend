const Joi = require('joi')
const inputValidationsHandler = require('../middlewares/inputValidationsHandler')
const { validateEmailUniqueness } = require('../services/contactService')

const validateContactEmail = async (value, helpers) => {
  const emailIsUnique = await validateEmailUniqueness(value)

  if (!emailIsUnique) {
    return helpers.message('Email already exist!')
  }
}

const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/

const schema = Joi.object({
  name: Joi.string().min(3).max(60).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .external(validateContactEmail),
  phone: Joi.string().regex(phoneRegex).required(),
})

const contactCreateValidation = async (req, res, next) => {
  return inputValidationsHandler(req, res, next, schema)
}

module.exports = contactCreateValidation
