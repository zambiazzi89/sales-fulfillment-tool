import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import Users from './Data/Users.js'
import CUSTOMERS from './Data/Customers/Customers.js'
import ITEMS from './Data/Items/Items.js'
import LTL_VALUES from './Data/LTLValues.js'
import FAKE_CUSTOMERS from './Data/Customers/FakeCustomers.js'
import FAKE_ITEMS from './Data/Items/FakeItems.js'
import FAKE_LTL_VALUES from './Data/FakeLTLValues.js'
import User from './Models/userModel.js'
import Items from './Models/itemModel.js'
import Customers from './Models/customerModel.js'
import LTL from './Models/LTLModel.js'
import FakeItems from './Models/fakeItemModel.js'
import FakeCustomers from './Models/fakeCustomerModel.js'
import FakeLTL from './Models/fakeLTLModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Items.deleteMany()
    await FakeItems.deleteMany()
    await Customers.deleteMany()
    await FakeCustomers.deleteMany()
    await LTL.deleteMany()
    await FakeLTL.deleteMany()

    await User.insertMany(Users)
    await Items.insertMany(ITEMS)
    await FakeItems.insertMany(FAKE_ITEMS)
    await Customers.insertMany(CUSTOMERS)
    await FakeCustomers.insertMany(FAKE_CUSTOMERS)
    await LTL.insertMany(LTL_VALUES)
    await FakeLTL.insertMany(FAKE_LTL_VALUES)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Items.deleteMany()
    await FakeItems.deleteMany()
    await Customers.deleteMany()
    await FakeCustomers.deleteMany()
    await LTL.deleteMany()
    await FakeLTL.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
