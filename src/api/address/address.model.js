const { Schema, model } = require("mongoose")

const addressSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  neighborhood: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

const Address = model('address', addressSchema)

module.exports = Address