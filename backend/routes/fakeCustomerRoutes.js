import express from 'express'
import {
  getFakeCustomerById,
  getFakeCustomers,
} from '../controllers/fakeCustomerController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect, getFakeCustomers)
router.route('/:id').get(protect, getFakeCustomerById)

export default router
