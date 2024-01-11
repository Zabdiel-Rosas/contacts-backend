const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

//@desc Get All Contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id })
  res.status(200).json(contacts)
})

//@desc Create Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    res.status(400)
    throw new Error('All fields are mandatory!')
  }

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
  const { id } = req.params
  const contact = await Contact.findById(id)

  if (!contact) {
    res.status(404)
    throw new Error('Contact was not found!')
  }
  res.status(200).json(contact)
})

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params
  const contact = await Contact.findById(id)

  if (!contact) {
    res.status(404)
    throw new Error('Contact was not found!')
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error(
      "The User doesn't have permission to update another user's contact!"
    )
  }
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(200).json(updatedContact)
})

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params
  const contact = await Contact.findById(id)

  if (!contact) {
    res.status(404)
    throw new Error('Contact was not found!')
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error(
      "The User doesn't have permission to delete another user's contact!"
    )
  }
  await Contact.findByIdAndDelete(id)
  res.status(204)
})

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
}
