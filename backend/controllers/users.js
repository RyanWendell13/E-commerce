const router = require('express').Router()
const db = require("../models")
const bcrypt = require("bcrypt")

router.post('/', async(req, res) =>{
    let password = await bcrypt.hash(req.body.password, 10)
    console.log(password)

    const user = await db.User.create({
        email: req.body.email,
        password: password,
        items: []
    })
    res.redirect('/')
})

router.post('/authentication', async (req, res) => {

    console.log(req.body.email + " " + req.body.password)
    console.log(typeof(req.body.email))
    let user = await db.User.findOne({email: req.body.email})
    console.log(user)
    if(!user || !await bcrypt.compare(req.body.password, user.password)){
        if (!user){
            console.log("cant find user")
        }
        else{
            console.log("bycrypt error")
        }
        res.status(404).json({
            message: 'Incorrect email or password'
        })
    }
    else{
        req.session.id = user._id
        res.json({user})
    }

})

router.get('/profile', async (req, res) => {
    try {
        let user = await db.User.findById(req.session.id)
        res.json(user)
    } catch {
        res.json(null)
    }
})
module.exports = router