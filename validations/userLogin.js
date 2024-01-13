const joi = require('joi')
const validationsHandler = require('../middlewares/validationsHandler')

const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,64}$')),
})

const loginUserValidation = async (req, res, next) => {
  return validationsHandler(req, res, next, schema)
}

module.exports = loginUserValidation
