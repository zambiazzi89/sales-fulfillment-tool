import asyncHandler from 'express-async-handler'
import FakeCustomers from '../Models/fakeCustomerModel.js'
import FakeItems from '../Models/fakeItemModel.js'
import User from '../Models/userModel.js'

//@desc     Fetch all customers
//@route    GET /api/customers
//@access   Public
const getFakeCustomers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    const fakeCustomers = await FakeCustomers.find({})
    res.json(fakeCustomers)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc     Fetch single customer
//@route    GET /api/customers/:id
//@access   Public
const getFakeCustomerById = asyncHandler(async (req, res) => {
  const fakeCustomer = await FakeCustomers.findById(req.params.id)
  if (fakeCustomer) {
    // Retrieves individual item object from DB and return entries array for itemEntries
    const getFakeItem = async (item) => {
      const itemObject = await FakeItems.findById(item)
      return [item, itemObject]
    }
    // Transforms customer item data, calls getItem, and returns items object for customerItemObject
    const fakeItemEntries = async () => {
      // Transforms mongoose Map into Object and gets an array with its keys
      const itemKeys = Object.keys(Object.fromEntries(fakeCustomer.items))
      // Calls getItem for each item of the array
      const entries = await Promise.all(
        itemKeys.map((item) => getFakeItem(item))
      )
      // Creates new Map with entries
      const itemMap = new Map(entries)
      // Transforms Map into Object
      const itemObject = Object.fromEntries(itemMap)
      return itemObject
    }
    const customerItemObject = await fakeItemEntries()

    res.json({ customer: fakeCustomer, customerItemObject: customerItemObject })
  } else {
    res.status(404)
    throw new Error('Customer not found')
  }
})

export { getFakeCustomers, getFakeCustomerById }
