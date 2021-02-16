import express from 'express'
import { getItemById, getItems } from '../controllers/itemController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect, admin, getItems)
router.route('/:id').get(protect, admin, getItemById)

export default router
