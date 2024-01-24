import { Router } from 'express'
import contactRoutes from './contactRoutes.js'
import userRoutes from './userRoutes.js'

const router = Router()

router.use('/api/contacts', contactRoutes)
router.use('/api/users', userRoutes)

export default router
