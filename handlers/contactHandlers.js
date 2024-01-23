const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
const {
  findContactById,
  findContactsByUserId,
} = require('../services/contactService')
const throwCustomError = require('../services/throwCustomError')

//@desc Get All Contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await findContactsByUserId(req.user.id)

  res.status(200).json(contacts)
})

//@desc Create Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  })

  res.status(201).json(contact)
})

//@desc Get Single Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await findContactById(req.params.id)

  if (!contact) {
    throwCustomError(400, 'The Contact does not exists!')
  }

  res.status(200).json(contact)
})

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contactId = req.params.id
  const userId = req.user.id

  const contact = await findContactById(contactId)

  if (!contact) {
    throwCustomError(400, 'Contact does not exists!')
  }

  if (contact.user_id.toString() !== userId) {
    throwCustomError(403, "Can't update another user's contact!")
  }

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })
  res.status(200).json(updatedContact)
})

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contactId = req.params.id
  const userId = req.user.id

  const contact = await findContactById(contactId)

  if (!contact) {
    throwCustomError(400, "Contact wasn't found!")
  }

  if (contact.user_id.toString() !== userId) {
    throwCustomError(403, "Can't delete another user's contact!")
  }

  await Contact.findByIdAndDelete(contactId)
  res.status(204).json({})
})

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
}
