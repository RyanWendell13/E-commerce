import { RequestWithCurrentUser } from "./types/request"
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const db = require('./models')
const methodOverride = require('method-override')
const cookieSession = require('cookie-session')
const defineCurrentUser = require('./middleware/defineCurrentUser')
require('dotenv').config()
import { Request, Response } from "express"
import { DBItemInfo } from "./types/item"
import { User } from "./types/user"

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
app.use(express.static(path.resolve(__dirname, '../../frontend/build')));
app.use(bodyParser.json())
app.use(defineCurrentUser)

app.use('/users', require('./controllers/users'))

//returns products from api
app.get('/api/products',(req:Request,res:Response) => {
  fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(json => res.json(json))
})

//returns array of products compiled from api
app.get ('/api/cart',(req:RequestWithCurrentUser,res:Response) => {
  if(req.currentUser){
    db.User.findById(req.currentUser._id)
    .populate('items')
    .then((user: { items: DBItemInfo[] }) => {
      db.Item.find({
        _id: {$in: user.items.map(i => {
          return i._id
        })}
      })
      .then((items: DBItemInfo[]) => {
        Promise.all(items.map((i: DBItemInfo) => {
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
app.post('/api/additem', (req:RequestWithCurrentUser, res:Response)=>{
  if(req.currentUser){
    db.User.findById(req.currentUser._id)
    .populate('items')
    .then((user: {save(): Promise<User>; items: DBItemInfo[]}) => {
      db.Item.findOneAndUpdate({$and:[{
        _id: {$in: user.items.map((i: DBItemInfo) => {
          return i._id
        })}},
        {
          id: req.body.id
        }
      ]},{$inc : {'quantity' : 1}}) 
      .then((r: null) => {
        if (r == null){
          db.Item.create({id: req.body.id, quantity: 1 })
          .then((item: DBItemInfo) => {
            user.items.push(item)
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
app.delete('/api/removeitem', (req:RequestWithCurrentUser, res:Response)=>{
  if(req.currentUser){
    db.User.findById(req.currentUser._id)
    .populate('items')
    .then((user: { items: DBItemInfo[] }) => {
      db.Item.findOneAndDelete({$and:[{
        _id: {$in: user.items.map((i:DBItemInfo) => {
          return i._id
        })}},
        {
          id: req.body.id
        }
      ]})
      .then((i: DBItemInfo) => {
        db.User.findByIdAndUpdate(req.currentUser._id,{$pull: {items: i._id}})
        .then(() => {
          res.redirect('/cart')
        })
      })
    })
  }
})

//gets a specific products data
app.get('/api/products/:id', (req:Request, res:Response)=>{
  fetch(`https://dummyjson.com/products/${req.params.id}`)
  .then(response => response.json())
  .then(json => {
    res.json(json)
  })
})

//Return the amount of item in cart
app.get('/api/cart/count/:id', (req:RequestWithCurrentUser, res:Response)=>{
  if(req.currentUser){
    db.User.findById(req.currentUser._id)
    .populate('items')
    .then((user: { items: DBItemInfo[] }) => {
      db.Item.findOne({$and:[{
        _id: {$in: user.items.map((i: DBItemInfo) => {
          return i._id
        })}},
        {
          id: req.params.id
        }
      ]})
      .then((item: DBItemInfo | null) => {
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
app.put('/api/cart/count/:id', (req:RequestWithCurrentUser, res:Response)=>{
  if(req.currentUser){
    db.User.findById(req.currentUser._id)
    .populate('items')
    .then((user: { items: DBItemInfo[] }) => {
      db.Item.findOneAndUpdate({$and:[{
        _id: {$in: user.items.map((i: DBItemInfo) => {
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
app.get('/api/cart/count', (req:RequestWithCurrentUser, res:Response)=>{
  if (req.currentUser){
    db.User.findById(req.currentUser._id)
    .then((user: { items: DBItemInfo[] }) => {
     if(user.items.length > 0){
      if(user.items.length > 1){
        db.Item.find({_id: {$in: user.items.map((i: DBItemInfo) => {
          return i._id
        })}
      })
      .then((items: DBItemInfo[]) => {
          if(items.length){
            res.json(items.map(i => {
              return i.quantity
            }).reduce((pv,cv) => pv+cv, 0)) 
          }
        })
      }
      else{
        db.Item.find({_id: {$in: user.items.map((i: DBItemInfo) => {
            return i._id
          })}
        })
        .then((items: DBItemInfo) => {
          if(items.quantity){
            res.json(items.quantity)
          }
        })
      }
      
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

app.get('/*', (req:Request, res:Response)=>{
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'))
})

app.listen(process.env.PORT, ()=>{
  console.log('listening on port 3001')
})
