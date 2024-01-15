const express = require('express')
const router = express.Router()
//Inputs Validation
const {
  contactCreateValidation,
  contactUpdateValidation,
} = require('../validations/index')
//Logic Validation
const {
  validateContactCreate,
  validateContactUpdate,
} = require('../services/validateContactRoutes')
const validateToken = require('../middlewares/validateTokenHandler')
//Handlers
const {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require('../handlers/contactHandlers')

router.use(validateToken)
router.get('/', getAllContacts)
router.post('/', contactCreateValidation, validateContactCreate, createContact)
router.put(
  '/:id',
  contactUpdateValidation,
  validateContactUpdate,
  updateContact
)
router.route('/:id').get(getContact).delete(deleteContact)

module.exports = router
