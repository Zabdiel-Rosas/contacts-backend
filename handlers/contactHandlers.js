const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
const {
  findContactById,
  findContactsByUserId,
} = require('../services/contactService')

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
    res.status(400).json({
      property: 'id',
      message: 'The Contact does not exists!',
      type: 'Url Parameter',
    })
    return
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
    res.status(400).json({
      property: 'id',
      message: 'The Contact does not exists!',
      type: 'Url Parameter',
    })
    return
  }

  if (contact.user_id.toString() !== userId) {
    res.status(403).json({
      property: 'userId',
      message: "Can't update another user's contact!",
      type: 'User Permission',
    })
    return
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
    res.status(400).json({
      property: 'id',
      message: 'The Contact does not exists!',
      type: 'Url Parameter',
    })
    return
  }

  if (contact.user_id.toString() !== userId) {
    res.status(403).json({
      property: 'userId',
      message: "Can't delete another user's contact!",
      type: 'User Permission',
    })
    return
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
