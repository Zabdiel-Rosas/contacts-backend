const express = require('express')
const router = express.Router()

// External middleware
const validateToken = require('../middlewares/validateTokenHandler')
//Internal validations and services
const {
  contactCreateValidation,
  contactUpdateValidation,
} = require('../validations/index')

const {
  validateContactCreate,
  validateContactUpdate,
  validateContactDelete,
} = require('../services/validateContactRoutes')

//Handlers
const {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require('../handlers/contactHandlers')

// Middleware for all routes
router.use(validateToken)

// Routes
router.get('/', getAllContacts)
router.post('/', contactCreateValidation, validateContactCreate, createContact)
router.put(
  '/:id',
  contactUpdateValidation,
  validateContactUpdate,
  updateContact
)
router.get('/:id', getContact)
router.delete('/:id', validateContactDelete, deleteContact)

module.exports = router
