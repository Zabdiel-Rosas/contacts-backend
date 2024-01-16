const {
  findContactById,
  findContactByProperty,
  validateEmailUniqueness,
  validateContactExistence,
  validateUserOwnership,
} = require('../services/contactService')

const errorHandler = require('./errorHandler')

const validateContactCreate = async (req, res, next) => {
  try {
    const email = req.body.email
    await validateEmailUniqueness(email)

    next()
  } catch (err) {
    res.status(err.status)
    errorHandler(err, req, res)
  }
}

const validateContactUpdate = async (req, res, next) => {
  try {
    const contactId = req.params.id
    const userId = req.user.id
    const emailToUpdate = req.body.email

    const contact = await findContactById(contactId)
    validateContactExistence(contact)

    validateUserOwnership(contact, userId)

    findContactByProperty('email', emailToUpdate)

    await validateEmailUniqueness(emailToUpdate)

    next()
  } catch (err) {
    res.status(err.status)
    errorHandler(err, req, res)
  }
}

const validateContactDelete = async (req, res, next) => {
  try {
    const contactId = req.params.id
    const userId = req.user.id

    const contact = await findContactById(contactId)

    validateContactExistence(contact)

    validateUserOwnership(contact, userId)

    next()
  } catch (err) {
    res.status(err.status)
    errorHandler(err, req, res)
  }
}

module.exports = {
  validateContactCreate,
  validateContactUpdate,
  validateContactDelete,
}
