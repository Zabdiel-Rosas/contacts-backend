const registerUserValidation = require('./userRegister')
const loginUserValidation = require('./userLogin')
const contactCreateValidation = require('./contactCreate')
const contactUpdateValidation = require('./contactUpdate')

module.exports = {
  registerUserValidation,
  loginUserValidation,
  contactCreateValidation,
  contactUpdateValidation,
}
