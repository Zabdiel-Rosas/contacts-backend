const { Router } = require('express')
const router = Router()
const {
  userRegisterHandler,
  userLoginHandler,
  userCurrentHandler,
} = require('../handlers/userHandlers')
//Inputs Validations
const {
  registerUserValidation,
  loginUserValidation,
} = require('../validations/index')
//Logic Validations
const {
  validateUserRegister,
  validateUserLogin,
} = require('../services/userService')
const validateToken = require('../middlewares/validateTokenHandler')

router.post(
  '/register',
  registerUserValidation,
  validateUserRegister,
  userRegisterHandler
)
router.post('/login', loginUserValidation, validateUserLogin, userLoginHandler)
router.get('/current', validateToken, userCurrentHandler)

module.exports = router
