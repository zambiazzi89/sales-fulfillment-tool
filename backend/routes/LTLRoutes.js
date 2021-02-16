import express from 'express'
import asyncHandler from 'express-async-handler'
import LTL from '../Models/LTLModel.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

//@desc     Fetch LTL values
//@route    GET /api/LTL
//@access   Public
router.get(
  '/',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const ltlValues = await LTL.findById('LTL_id')
    res.json(ltlValues)
  })
)

export default router
