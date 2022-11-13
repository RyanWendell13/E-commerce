// carts[cart{email,password,[items{id, quantity}] }]

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
})

module.exports = mongoose.model('User', userSchema)
