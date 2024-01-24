import express from 'express'
// External middleware
import validateToken from '../middlewares/validateTokenHandler.js'
//Internal validations and services
import {
  contactCreateValidation,
  contactUpdateValidation,
} from '../validations/index.js'

//Handlers
import {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} from '../handlers/contactHandlers.js'

const router = express.Router()

// Middleware for all routes
router.use(validateToken)

// Routes
router.get('/', getAllContacts)
router.post('/', contactCreateValidation, createContact)
router.put('/:id', contactUpdateValidation, updateContact)
router.get('/:id', getContact)
router.delete('/:id', deleteContact)

export default router
