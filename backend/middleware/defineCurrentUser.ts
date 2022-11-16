const db = require("../models")
import { Request, Response } from "express"
import { RequestWithCurrentUser } from "../types/request"
import { User } from "../types/user"

async function defineCurrentUser(req:RequestWithCurrentUser, res:Response, next: Function) {
    try {
        let user: User = await db.User.findById(req.session._id)
        req.currentUser = user
        next()
    } catch {
        next()
    }
}

module.exports = defineCurrentUser