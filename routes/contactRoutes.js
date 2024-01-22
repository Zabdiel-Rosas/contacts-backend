const express = require('express')
const router = express.Router()

// External middleware
const validateToken = require('../middlewares/validateTokenHandler')
//Internal validations and services
const {
  contactCreateValidation,
  contactUpdateValidation,
} = require('../validations/index')

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
router.post('/', contactCreateValidation, createContact)
router.put('/:id', contactUpdateValidation, updateContact)
router.get('/:id', getContact)
router.delete('/:id', deleteContact)

module.exports = router
