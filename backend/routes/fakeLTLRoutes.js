import express from 'express'
import asyncHandler from 'express-async-handler'
import FakeLTL from '../Models/fakeLTLModel.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

//@desc     Fetch LTL values
//@route    GET /api/LTL
//@access   Public
router.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { stateValues } = await FakeLTL.findById('fake_LTL_id')
    res.json({ LTL: stateValues, threePL: process.env.GUEST_LTL })
  })
)

export default router
