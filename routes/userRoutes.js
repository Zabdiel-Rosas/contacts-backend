const express = require('express')
const router = express.Router()

router.post('/register', (req, res) => {
  res.status(201).json({ message: 'Register User' })
})

router.post('/login', (req, res) => {
  res.status(201).json({ message: 'Login User' })
})

router.get('/current', (req, res) => {
  res.status(200).json({ message: 'Current User Information' })
})

module.exports = router
