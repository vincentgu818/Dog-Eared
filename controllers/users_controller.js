const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')
const User = require('../models/users.js');
const session = require('express-session')

router.use(session({
  secret: "thisisasecret",
  resave: false,
  saveUninitialized: false
}))

// New route
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

// Create route
router.post('/', (req, res) => {
    User.create(req.body, (err, createdUser)=>{
        res.redirect('/');
    });
});

// View cart route
router.get('/cart', (req, res) => {
  if(!req.session.cart) req.session.cart = []
  res.render('users/cart.ejs',
    {
      contents: req.session.cart
    }
  )
})

// Add to Cart route
router.put('/:id/add_to_cart', (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    if(!req.session.cart) req.session.cart = []
    req.session.cart.push(foundBook)
    console.log(req.session.cart);
    res.redirect('/users/cart')
  })
})

module.exports = router
