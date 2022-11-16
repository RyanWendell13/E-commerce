

require('dotenv').config()
import mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI as string)

// {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// }

module.exports.Item = require('./item')
module.exports.User = require('./user')