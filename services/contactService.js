const Contact = require('../models/contactModel')

const findContactById = async (id) => {
  const contact = await Contact.findById(id)
  return contact
}

const findContactsByUserId = async (userId) => {
  const contacts = await Contact.find({ user_id: userId })
  return contacts
}

const validateEmailUniqueness = async (email) => {
  const emailExists = await Contact.findOne({ email })
  return emailExists === null
}

module.exports = {
  findContactById,
  findContactsByUserId,
  validateEmailUniqueness,
}
