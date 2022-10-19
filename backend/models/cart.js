// carts[cart{username,password,[items{id, quantity}] }]

const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  username: {type: Number, required: true},
  password: {type: Number, required: true},
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
})

module.exports = mongoose.model('Cart', itemSchema)
