import express from 'express'
import {
  getCustomerById,
  getCustomers,
} from '../controllers/customerController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect, admin, getCustomers)
router.route('/:id').get(protect, admin, getCustomerById)

export default router
