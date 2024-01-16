const Contact = require('../models/contactModel')

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
    throwCustomError(403, "Can't update or delete another user's contact!")
  }
}

const validateEmailUniqueness = async (email) => {
  const emailExists = await Contact.findOne({ email })
  if (emailExists) {
    throwCustomError(400, 'The email you sent is already registered!')
  }
}

module.exports = {
  findContactById,
  findContactByProperty,
  findContactsByUserId,
  validateContactExistence,
  validateUserOwnership,
  validateEmailUniqueness,
}
