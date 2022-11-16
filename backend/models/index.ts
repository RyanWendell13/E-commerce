import mongoose from 'mongoose'
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI as string)

// {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// }

module.exports.Item = require('./item')
module.exports.User = require('./user')