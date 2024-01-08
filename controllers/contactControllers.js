const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

//@desc Get All Contacts
//@route GET /api/contacts
//@access public
const getAllContacts = asyncHandler(async (req, res) => {
  const allContacts = await Contact.find()
  res.status(200).json(allContacts)
})

//@desc Create Contact
//@route POST /api/contacts
//@access public
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
  })

  res.status(201).json(contact)
})

//@desc Get Single Contact
//@route GET /api/contacts/:id
//@access public
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
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params
  const contact = await Contact.findById(id)

  if (!contact) {
    res.status(404)
    throw new Error('Contact was not found!')
  }
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(200).json(updatedContact)
})

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params
  const contact = await Contact.findById(id)

  if (!contact) {
    res.status(404)
    throw new Error('Contact was not found!')
  }
  const deletedContact = await Contact.findByIdAndDelete(id)
  res.status(200).json(deletedContact)
})

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
}
