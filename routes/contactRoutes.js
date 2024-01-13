const express = require('express')
const router = express.Router()
//Inputs Validation
const contactCreateValidation = require('../validations/contactCreate')
const contactUpdateValidation = require('../validations/contactUpdate')
//Logic Validation
const validateToken = require('../middlewares/validateTokenHandler')
const {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require('../handlers/contactHandlers')

router.use(validateToken)
router.get('/', getAllContacts)
router.post('/', contactCreateValidation, createContact)
router.put('/:id', contactUpdateValidation, updateContact)
router.route('/:id').get(getContact).delete(deleteContact)

module.exports = router
