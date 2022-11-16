const db = require("../models")
import { Request, Response } from "express"
import { RequestWithCurrentUser } from "../types/request"

async function defineCurrentUser(req:RequestWithCurrentUser, res:Response, next: Function) {
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