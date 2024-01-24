import contactModel from '../models/contactModel.js'

const findContactById = async (id) => {
  const contact = await contactModel.findById(id)
  return contact
}

const findContactsByUserId = async (userId) => {
  const contacts = await contactModel.find({ user_id: userId })
  return contacts
}

const validateEmailUniqueness = async (email) => {
  const emailExists = await contactModel.findOne({ email })
  return emailExists === null
}

export { findContactById, findContactsByUserId, validateEmailUniqueness }
