const express = require('express')
const router = express.Router()
const validateToken = require('../middlewares/validateTokenHandler')
const {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactControllers')

router.use(validateToken)
router.route('/').get(getAllContacts).post(createContact)
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

module.exports = router
