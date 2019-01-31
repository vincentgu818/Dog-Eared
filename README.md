# Dog-Eared
## Introduction
Dog-Eared is an online bookstore with full CRUD capability.
## Technologies Used
Dog-Eared is an Express app utilizing Mongoose to interface with a MongoDB. Express-session is used for session management and Request-promise is used to call Google Books API for the seed route.
## Live Site Link
https://dogeared.herokuapp.com/books
## Unsolved Problems
### Lack of Encryption
Currently, user authentication lacks encryption. Bcrypt is the readily available solution to be implemented.
### Shopping Cart
The shopping cart is primitive at the moment. It should interface with the stock quantities of books as well as a to be implemented user credit account and order history.
### Categories and Search
Presently the user is thrown into a voluminous and chaotic sea of books on the index route. Future development should capitalize on the API provided categories property and provide a user experience that includes compartmentalization of the store's book inventory. More ambitiously, future development might enable search functionality of some sort.
