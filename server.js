// Dependencies
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const booksController = require('./controllers/books_controller.js')
const usersController = require('./controllers/users_controller.js')
const db = mongoose.connection
const session = require('express-session')

// Port
const PORT = process.env.PORT || 3000

// Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ 'dogeared'

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))

// open the connection to mongo
db.on('open' , ()=>{})

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use('/books',booksController)
app.use('/users',usersController)
app.use(session({
  secret: "thisisasecret",
  resave: false,
  saveUninitialized: false
}))

app.listen(PORT, () => {
  console.log('listening...')
})
