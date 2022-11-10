const db = require("../models")

const { User } = db;

async function defineCurrentUser(req, res, next) {
    try {
        let user = await User.findOne({
            where: {
                _id: req.session.id
            }
        })
        req.currentUser = user
        next()
    } catch {
        next()
    }
    next()
}

module.exports = defineCurrentUser