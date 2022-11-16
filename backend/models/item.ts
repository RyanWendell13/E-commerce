import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  quantity: {type: Number, required: true}
})

module.exports = mongoose.model('Item', itemSchema)
