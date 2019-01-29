const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')
const request = require('request')
const rp = require('request-promise')
const session = require('express-session')

const bookQueries = []
const bookLinks = []
let seedBooks = [] // require('../models/seed_books.js')

router.use(session({
  secret: "thisisasecret",
  resave: false,
  saveUninitialized: false
}))

// rp('https://www.googleapis.com/books/v1/volumes?q=').
//   then((body) => {
//     let jsonBody = JSON.parse(body)
//      for(let googleBook of jsonBody.items) {
//
//        let book = {}
//
//        book.title = googleBook.volumeInfo.title
//        if(googleBook.volumeInfo.subtitle) {
//          book.title += ': '+googleBook.volumeInfo.subtitle
//        }
//
//       book.authors = googleBook.volumeInfo.authors
//
//       book.categories = googleBook.volumeInfo.categories
//
//       book.description = googleBook.volumeInfo.description
//
//       if(googleBook.volumeInfo.imageLinks) {
//         book.img = googleBook.volumeInfo.imageLinks.thumbnail
//       }
//
//       if(googleBook.saleInfo.listPrice) {
//         book.price = googleBook.saleInfo.listPrice.amount
//       }
//
//       seedBooks.push(book)
//     }
//   })
// //
//
const requestFromNYT = (body) => {
  let jsonBody = JSON.parse(body)
  for(let nytBook of jsonBody.results.books) {
    let bookQuery = nytBook.title + ' ' + nytBook.author
    if(bookQueries.indexOf(bookQuery) === -1) bookQueries.push(bookQuery)
  }
}

const requestFromGoogle = (body) => {
  let jsonBody = JSON.parse(body)
  bookLinks.push(body.items[0].selfLink)
  console.log(bookLinks.length)
}

const requestOneFromGoogle = (htmlString) => {
  if (!error && response.statusCode == 200) {
    let jsonBody = JSON.parse(htmlString)
    console.log(body.volumeInfo.title);
  }
}
//
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
    r es.render('books/index.ejs',
      {
        books: allBooks
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
        book: foundBook
      }
    )
  })
})

module.exports = router
