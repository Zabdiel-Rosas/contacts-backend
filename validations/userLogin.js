const joi = require('joi')
const inputValidationsHandler = require('../middlewares/inputValidationsHandler')

const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,64}$')),
})

const loginUserValidation = async (req, res, next) => {
  return inputValidationsHandler(req, res, next, schema)
}

module.exports = loginUserValidation
