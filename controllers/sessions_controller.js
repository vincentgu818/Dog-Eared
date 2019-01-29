const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')
const User = require('../models/users.js')
const session = require('express-session')
const methodOverride = require('method-override')

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
router.post('/', (req, res)=>{
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(req.body.password == foundUser.password){
          req.session.currentUser = foundUser;
          res.redirect('/books/');
        } else {
          res.send('wrong password');
        }
    });
});

// Destroy route
router.delete('/', (req, res) => {
  req.session.destroy(()=>{
    res.redirect('/books');
  });
})

module.exports = router
