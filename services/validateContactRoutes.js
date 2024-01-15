const Contact = require('../models/contactModel')
const errorHandler = require('../middlewares/errorHandler')

const throwCustomError = (statusCode, message) => {
  const error = new Error(message)
  error.status = statusCode
  throw error
}

const findContactById = async (id) => {
  const contact = await Contact.findById(id)
  return contact
}

const findContactByProperty = async (propertyName, property) => {
  const contact = await Contact.findOne({ [propertyName]: property })
  return contact
}

const findContactsByUserId = async (userId) => {
  const contacts = await Contact.find({ user_id: userId })
  return contacts
}

const validateContactExistence = (contact) => {
  if (!contact) {
    throwCustomError(404, "The contact wasn't found!")
  }
}

const validateUserOwnership = (contact, userId) => {
  if (contact.user_id.toString() !== userId) {
    throwCustomError(403, "Can't update another user's contact!")
  }
}

const validateEmailUniqueness = async (email) => {
  const emailExists = await Contact.findOne({ email })
  if (emailExists) {
    throwCustomError(400, 'The email you sent is already registered!')
  }
}

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

module.exports = {
  findContactById,
  findContactsByUserId,
  validateContactExistence,
  validateContactCreate,
  validateContactUpdate,
}
