const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')
const User = require('../models/users.js')
const session = require('express-session')
const methodOverride = require('method-override')

// New route
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs')
});

// Create route
router.post('/', (req, res)=>{
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(req.body.password == foundUser.password){
          req.session.currentUser = foundUser
          if(!req.session.cart) req.session.cart = []
          req.session.cart = req.session.currentUser.cart.concat(req.session.cart)
          res.redirect('/books/')
        } else {
          res.send('wrong password')
        }
    })
})

// Destroy route
router.delete('/', (req, res) => {
  User.findByIdAndUpdate(req.session.currentUser._id, {$set: { cart: req.session.cart }}, (err, updatedUser) => {
    console.log(updatedUser)
    req.session.destroy(() => {
      res.redirect('/books')
    })
  })
})

module.exports = router
