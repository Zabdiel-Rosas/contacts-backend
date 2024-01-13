const joi = require('joi')
const validationsHandler = require('../middlewares/validationsHandler')

const schema = joi.object({
  username: joi.string().required().min(3).max(60),
  email: joi.string().email().required(),
  password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,64}$')),
  // repeatPassword: joi.ref('password'),
})

const registerUserValidation = async (req, res, next) => {
  return validationsHandler(req, res, next, schema)
}

module.exports = registerUserValidation
