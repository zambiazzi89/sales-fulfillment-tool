import asyncHandler from 'express-async-handler'
import Customers from '../Models/customerModel.js'
import Items from '../Models/itemModel.js'
import User from '../Models/userModel.js'

//@desc     Fetch all customers
//@route    GET /api/customers
//@access   Public
const getCustomers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    const customers = await Customers.find({})
    res.json(customers)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc     Fetch single customer
//@route    GET /api/customers/:id
//@access   Public
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customers.findById(req.params.id)
  if (customer) {
    // Retrieves individual item object from DB and return entries array for itemEntries
    const getItem = async (item) => {
      const itemObject = await Items.findById(item)
      return [item, itemObject]
    }
    // Transforms customer item data, calls getItem, and returns items object for customerItemObject
    const itemEntries = async () => {
      // Transforms mongoose Map into Object and gets an array with its keys
      const itemKeys = Object.keys(Object.fromEntries(customer.items))
      // Calls getItem for each item of the array
      const entries = await Promise.all(itemKeys.map((item) => getItem(item)))
      // Creates new Map with entries
      const itemMap = new Map(entries)
      // Transforms Map into Object
      const itemObject = Object.fromEntries(itemMap)
      return itemObject
    }
    const customerItemObject = await itemEntries()

    res.json({
      customer: customer,
      customerItemObject: customerItemObject,
    })
  } else {
    res.status(404)
    throw new Error('Customer not found')
  }
})

export { getCustomers, getCustomerById }
