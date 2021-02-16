import mongoose from 'mongoose'

const customerSchema = mongoose.Schema(
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

const Customers = mongoose.model('Customers', customerSchema)

export default Customers
