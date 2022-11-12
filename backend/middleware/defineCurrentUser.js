const db = require("../models")

async function defineCurrentUser(req, res, next) {

    // try {
    //     let user = await db.User.findById(req.session.id)
    //     res.json(user)
    // } catch {
    //     res.json(null)
    // }

    try {
        let user = await db.User.findById(req.session.id)
        req.currentUser = user
        next()
    } catch {
        next()
    }
}

module.exports = defineCurrentUser