const router = require('express').Router()
const db = require("../models")
const bcrypt = require("bcrypt")
import {Request, Response} from "express"
import { RequestWithCurrentUser } from "../types/request"
import { User } from "../types/user"

router.post('/', async(req:Request, res:Response) =>{
    const user = await db.User.create({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        items: []
    })
    
    res.redirect('/')
})

router.post('/authentication', async (req:RequestWithCurrentUser, res:Response) => {
    let user:User = await db.User.findOne({email: req.body.email})
    if(!user || !await bcrypt.compare(req.body.password, user.password)){
        res.status(404).json({
            message: 'Incorrect email or password'
        })
    }
    else{
        req.session.id = user._id
        res.json({user})
    }

})

router.get('/profile', async (req: RequestWithCurrentUser, res:Response) => {
    res.json(req.currentUser)
})
module.exports = router