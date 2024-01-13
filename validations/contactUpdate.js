const Joi = require('joi')
const validationsHandler = require('../middlewares/validationsHandler')

const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/

const schema = Joi.object({
  name: Joi.string().min(3).max(60),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string().regex(phoneRegex),
})

const contactUpdateValidation = async (req, res, next) => {
  return validationsHandler(req, res, next, schema)
}

module.exports = contactUpdateValidation
