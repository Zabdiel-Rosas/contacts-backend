const { Router } = require('express')
const router = Router()

router.use('/api/contacts', require('./contactRoutes'))
router.use('/api/users', require('./userRoutes'))

module.exports = router
