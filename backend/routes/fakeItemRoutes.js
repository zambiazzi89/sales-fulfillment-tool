import express from 'express'
import {
  getFakeItemById,
  getFakeItems,
} from '../controllers/fakeItemController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect, getFakeItems)
router.route('/:id').get(protect, getFakeItemById)

export default router
