import mongoose from 'mongoose'

const FakeLTLSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    stateValues: {
      type: Map,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const FakeLTL = mongoose.model('FakeLTL', FakeLTLSchema)

export default FakeLTL
