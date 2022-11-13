const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const db = require('./models')
const methodOverride = require('method-override')
const cookieSession = require('cookie-session')
const defineCurrentUser = require('./middleware/defineCurrentUser')
const user = require('./models/user')
const item = require('./models/item')
require('dotenv').config()

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET],
  sameSite: 'strict',
  //2 hours
  maxAge: 2*60*60*1000
}))

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.resolve(__dirname, './frontend/build')));
app.use(bodyParser.json())
app.use(defineCurrentUser)

app.use('/users', require('./controllers/users'))

//returns products from api
app.get('/api/products',(req,res) => {
  fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(json => res.json(json))
})

//returns array of products compiled from api
app.get ('/api/cart',(req,res) => {
  if(req.currentUser){
    db.User.findById(req.currentUser.id)
    .populate('items')
    .then(user => {
      db.Item.find({
        _id: {$in: user.items.map(i => {
          return i._id
        })}
      })
      .then( items => {
        Promise.all(items.map(i => {
          return fetch(`https://dummyjson.com/products/${i.id}`)
          .then(response => response.json())
          .then(json => {return json})
        }))
        .then(data => res.json(data))
      })
    }) 
  }
})


//add item to cart and if it already is in cart increment count by one
app.post('/api/additem', (req, res)=>{
  if(req.currentUser){
    db.User.findById(req.currentUser.id)
    .populate('items')
    .then(user => {
      db.Item.findOneAndUpdate({$and:[{
        _id: {$in: user.items.map(i => {
          return i._id
        })}},
        {
          id: req.body.id
        }
      ]},{$inc : {'quantity' : 1}}) 
      .then(r => {
        if (r == null){
          db.Item.create({id: req.body.id, quantity: 1 })
          .then(item => {
            user.items.push(item._id)
            user.save()
            .then(() => {
              console.log("added")
              res.redirect('/')
            })
          })
        }
        else{
            console.log("increment")
            res.redirect('/')
        }
      })
  })}
})

//removes item from cart
app.delete('/api/removeitem', (req, res)=>{
  if(req.currentUser){
    db.User.findById(req.currentUser.id)
    .populate('items')
    .then(user => {
      db.Item.findOneAndDelete({$and:[{
        _id: {$in: user.items.map(i => {
          return i._id
        })}},
        {
          id: req.body.id
        }
      ]})
      .then(i => {
        db.User.findByIdAndUpdate(req.currentUser.id,{$pull: {items: i._id}})
        .then(() => {
          res.redirect('/cart')
        })
      })
    })
  }
})

//gets a specific products data
app.get('/api/products/:id', (req, res)=>{
  fetch(`https://dummyjson.com/products/${req.params.id}`)
  .then(response => response.json())
  .then(json => {
    res.json(json)
  })
})

//Return the amount of item in cart
app.get('/api/cart/count/:id', (req, res)=>{
  if(req.currentUser){
    db.User.findById(req.currentUser.id)
    .populate('items')
    .then(user => {
      db.Item.findOne({$and:[{
        _id: {$in: user.items.map(i => {
          return i._id
        })}},
        {
          id: req.params.id
        }
      ]})
      .then(item => {
        if(item != null){
          res.json(item.quantity.toString())
        }
        else{
          res.json('0')
        }
      })
    })
  }
  else{
    res.json('0')
  }
})

//changes the amount of item in cart
app.put('/api/cart/count/:id', (req, res)=>{
  if(req.currentUser){
    db.User.findById(req.currentUser.id)
    .populate('items')
    .then(user => {
      db.Item.findOneAndUpdate({$and:[{
        _id: {$in: user.items.map(i => {
          return i._id
        })}},
        {
          id: req.params.id
        }
      ]},{quantity: req.body.count})
      .then(() => res.redirect('/cart'))
    })
  }
})

//returns total cart count
app.get('/api/cart/count', (req, res)=>{
  if (req.currentUser){
    db.User.findById(req.currentUser.id)
    .then(user => {
     if(user.items.length > 0)
     {
      db.Item.find({_id: {$in: user.items.map(i => {
        return i._id
      })}
    })
    .then(items => {
        if(items.length){
          res.json(items.map(i => {
            return i.quantity
          }).reduce((pv,cv) => pv+cv, 0)) 
        }
        else{
          if(items.quantity){
            res.json(items.quantity)
          }
        }
      })
     }
     else{
      res.json('0')
     }
    })
  }
  else{
    res.json('0')
  }
  
  
})

app.get('/*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

app.listen(process.env.PORT, ()=>{
  console.log('listening on port 3001')
})
