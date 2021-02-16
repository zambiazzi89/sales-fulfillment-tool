import mongoose from 'mongoose'

const FakeCustomerSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Map,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const FakeCustomers = mongoose.model('FakeCustomers', FakeCustomerSchema)

export default FakeCustomers
