import asyncHandler from 'express-async-handler'
import FakeItems from '../Models/fakeItemModel.js'
import User from '../Models/userModel.js'

//@desc     Fetch all items
//@route    GET /api/items
//@access   Public
const getFakeItems = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    const fakeItems = await FakeItems.find({})
    res.json(fakeItems)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc     Fetch single item
//@route    GET /api/items/:id
//@access   Public
const getFakeItemById = asyncHandler(async (req, res) => {
  const fakeItem = await FakeItems.findById(req.params.id)
  if (fakeItem) {
    res.json(fakeItem)
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})

export { getFakeItems, getFakeItemById }
