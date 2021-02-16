import asyncHandler from 'express-async-handler'
import Items from '../Models/itemModel.js'
import User from '../Models/userModel.js'

//@desc     Fetch all items
//@route    GET /api/items
//@access   Public
const getItems = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    const items = await Items.find({})
    res.json(items)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc     Fetch single item
//@route    GET /api/items/:id
//@access   Public
const getItemById = asyncHandler(async (req, res) => {
  const item = await Items.findById(req.params.id)
  if (item) {
    res.json(item)
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})

export { getItems, getItemById }
