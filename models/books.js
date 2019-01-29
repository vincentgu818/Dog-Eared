const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [ { type: String, required: true } ],
  categories: [ String ],
  description: String,
  img: { type: String, required: true, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRedJ722ivBSiQFbW-axqwk8Krg9yRtZ6e_So-DaoTIHD25jISF" },
  price: { type: Number, min: 0, required: true, default: 7.95 },
  qty: { type: Number, min: 0, required: true, default: 0 }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
