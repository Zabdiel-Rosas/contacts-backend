import { Router } from 'express'
import {
  userRegisterHandler,
  userLoginHandler,
  userCurrentHandler,
} from '../handlers/userHandlers.js'
//Inputs Validations
import {
  registerUserValidation,
  loginUserValidation,
} from '../validations/index.js'
//Logic Validations
import validateToken from '../middlewares/validateTokenHandler.js'

const router = Router()

router.post('/register', registerUserValidation, userRegisterHandler)
router.post('/login', loginUserValidation, userLoginHandler)
router.get('/current', validateToken, userCurrentHandler)

export default router
