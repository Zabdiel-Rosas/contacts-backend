//@desc Get All Contacts
//@route GET /api/contacts
//@access public
const getAllContacts = (req, res) => {
  res.status(200).json({ message: 'Get All Contacts' })
}

//@desc Create Contact
//@route POST /api/contacts
//@access public
const createContact = (req, res) => {
  res.status(200).json({ message: 'Create Contact' })
}

//@desc Get Single Contact
//@route GET /api/contacts/:id
//@access public
const getContact = (req, res) => {
  res.status(200).json({ message: `Get contact with id: ${req.params.id}` })
}

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = (req, res) => {
  res.status(200).json({ message: `Update contact with id: ${req.params.id}` })
}

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete contact with id: ${req.params.id}` })
}

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
}
