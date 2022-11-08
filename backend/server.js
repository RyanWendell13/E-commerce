const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const db = require('./models')
const methodOverride = require('method-override');
require('dotenv').config()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(bodyParser.json())
app.use('/users', require('./controllers/users'))


 
//returns products from api
app.get('/api/products',(req,res) => {
  fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(json => res.json(json))


})

//returns array of products compiled from api
app.get ('/api/cart',(req,res) => {
  db.Item.find().then( items => {
    Promise.all(items.map(i => {
      return fetch(`https://dummyjson.com/products/${i.id}`)
      .then(response => response.json())
      .then(json => {return json})
    }))
    .then(data => res.json(data))
  })
})

//add item to cart and if it already is in cart increment count by one
app.post('/api/additem', (req, res)=>{
    db.Item.findOne({id: req.body.id}).then(item => {
      if(item == null){
        db.Item.create({id: req.body.id, quantity: 1 })
        .then(() => {
          console.log(req.body)
          res.redirect('/')
        })
      }
      else{
        db.Item.findOneAndUpdate({id: req.body.id}, {$inc : {'quantity' : 1}})
        .then(() => {
          console.log(req.body)
          res.redirect('/')
        })
      }
    })
    
    
})

//removes item from cart
app.delete('/api/removeitem', (req, res)=>{
  db.Item.findOneAndDelete({id: req.body.id})
  .then(() => res.redirect('/cart') )
})

//gets a specific products data
app.get('/api/products/:id', (req, res)=>{
  fetch(`https://dummyjson.com/products/${req.params.id}`)
  .then(response => response.json())
  .then(json => {
    console.log(json)
    res.json(json)
  })
})

//Return the amount of item in cart
app.get('/api/cart/count/:id', (req, res)=>{
  db.Item.findOne({id: req.params.id})
  .then(item => {
    if(item == null){
      res.json('0')
    }
    else{
      res.json(item.quantity)
    }
  })
})

//changes the amount of item in cart
app.put('/api/cart/count/:id', (req, res)=>{
  console.log('running'+req.body.count)
  db.Item.findOneAndUpdate({id: req.params.id}, {quantity: req.body.count})
  .then(() => res.redirect('/cart') )
})

//returns total cart count
app.get('/api/cart/count', (req, res)=>{
  db.Item.find()
  .then(items => {
    console.log(items)
    console.log(items.length)
    if(items.length != 0){
      let counts = items.map(i => {return i.quantity})
      res.json(counts.reduce((pv,cv) => pv+cv, 0))
    }
    else{
      res.json('0')
    }
  }) 
})

app.get('/*', (req, res)=>{
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(process.env.PORT, ()=>{
  console.log('listening on port 3001')
})
