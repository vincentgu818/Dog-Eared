const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')
const rp = require('request-promise')
const session = require('express-session')

let seedBooks = [] // require('../models/seed_books.js')

// Seed route
router.get('/seed/:search', (req, res) => {
  seedBooks = []
  rp('https://www.googleapis.com/books/v1/volumes?q='+req.params.search)
    .then((body) => {
      let jsonBody = JSON.parse(body)
      for(let googleBook of jsonBody.items) {
        let book = {}

        book.title = googleBook.volumeInfo.title
        if(googleBook.volumeInfo.subtitle) {
          book.title += ': '+googleBook.volumeInfo.subtitle
        }

        book.authors = googleBook.volumeInfo.authors

        book.categories = googleBook.volumeInfo.categories

        book.description = googleBook.volumeInfo.description

        if(googleBook.volumeInfo.imageLinks) {
          book.img = googleBook.volumeInfo.imageLinks.thumbnail
        }

        if(googleBook.saleInfo.listPrice) {
          book.price = googleBook.saleInfo.listPrice.amount
        }

        seedBooks.push(book)
      }
      Book.create(seedBooks, (err, data) => {
        res.send(data)
      })
    })
})

// Index route
router.get('/', (req, res) => {
  Book.find({},(err, allBooks) => {
    res.render('books/index.ejs',
      {
        books: allBooks,
        currentUser: req.session.currentUser
      }
    )
  })
})

// New route
router.get('/new', (req, res) => {
  res.render('books/new.ejs')
})

// Create route
router.post('/', (req, res) => {
  req.body.authors = req.body.authors.split(', ')
  req.body.categories = req.body.categories.split(', ')
  Book.create(req.body, (err, createdBook) => {
    res.redirect('/books')
  })
})

// Edit route
router.get('/:id/edit', (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    res.render('books/edit.ejs',
      {
        book: foundBook
      }
    )
  })
})

// Update quantities route
router.get('/update_qty', (req, res) => {
  Book.update({qty: 0}, {$inc: {qty: 100}}, {multi: true}, (err, numUpdated) => {
    res.send(numUpdated)
  })
})

// Update route
router.put('/:id', (req, res) => {
  req.body.authors = req.body.authors.split(', ')
  req.body.categories = req.body.categories.split(', ')
  Book.findByIdAndUpdate(req.params.id, req.body, (err, updatedBook) => {
    res.redirect('/books/'+req.params.id)
  })
})

// Update route
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, (err, updatedBook) => {
    res.redirect('/books/'+req.params.id)
  })
})

// Destroy route
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, removedBook) => {
    res.redirect('/books')
  })
})

// Show route
router.get('/:id', (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    res.render('books/show.ejs',
      {
        book: foundBook,
        currentUser: req.session.currentUser
      }
    )
  })
})

module.exports = router
