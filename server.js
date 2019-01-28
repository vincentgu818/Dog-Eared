const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection

//PORT
const PORT = process.env.PORT || 3000

// DATABASE
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/' + 'herokuTest'

// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json()) // useful if you are using 3rd party API

// method override
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log('listening..');
})
