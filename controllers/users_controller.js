const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')
const User = require('../models/users.js')
const session = require('express-session')

// New route
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// Create route
router.post('/', (req, res) => {
  if(req.body.isAdmin === "on") {
    req.body.isAdmin = true;
  }
  else {
    req.body.isAdmin = false;
  }
  User.create(req.body, (err, createdUser)=>{
    res.redirect('/books')
  })
})

// View cart route
router.get('/cart', (req, res) => {
  if(!req.session.cart) req.session.cart = []
  res.render('users/cart.ejs',
    {
      cart: req.session.cart
    }
  )
})

// Checkout route
router.get('/cart/checkout', (req, res) => {
  req.session.cart = []
  console.log('checkout route');
  res.redirect('/books')
})

// Add to Cart route
router.put('/:id/add_to_cart', (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    if(!req.session.cart) req.session.cart = []
    req.session.cart.push(foundBook)
    res.redirect('/users/cart')
  })
})

module.exports = router
