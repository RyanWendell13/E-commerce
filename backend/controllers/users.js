const router = require('express').Router()
const db = require("../models")
const bcrypt = require("bcrypt")

router.post('/', async(req, res) =>{

    const user = await db.User.create({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        items: []
    })
    res.redirect('/')
})

router.post('/authentication', async (req, res) => {

    let user = await db.User.findOne({
        where: {email: req.body.email}
    })
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
module.exports = router