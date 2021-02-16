import mongoose from 'mongoose'

const FakeItemSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    microHoldDays: {
      type: String,
      required: true,
    },
    pickingDays3PL: {
      type: String,
      required: true,
    },
    casesPerPallet: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    lbsPerCase: {
      type: String,
      required: true,
    },
    WOC: {
      type: String,
      required: true,
    },
    shelfLife: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const FakeItems = mongoose.model('FakeItems', FakeItemSchema)

export default FakeItems
