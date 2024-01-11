const express = require('express')
const router = express.Router()
const {
  userRegisterHandler,
  userLoginHandler,
  userCurrentHandler,
} = require('../handlers/userHandlers')
const registerUserValidation = require('../validations/userRegister')
const validateToken = require('../middlewares/validateTokenHandler')

router.post('/register', registerUserValidation, userRegisterHandler)
router.post('/login', userLoginHandler)
router.get('/current', validateToken, userCurrentHandler)

module.exports = router
