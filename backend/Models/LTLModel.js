import mongoose from 'mongoose'

const LTLSchema = mongoose.Schema(
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

const LTL = mongoose.model('LTL', LTLSchema)

export default LTL
