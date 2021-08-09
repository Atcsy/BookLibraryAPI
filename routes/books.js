const express = require('express');
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/books');
const Book = require('../models/Book');
const pagination = require('../middleware/pagination');

const { auth } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/').get(pagination(Book), getBooks).post(auth, createBook);

router
  .route('/:id')
  .get(getBook)
  .put(auth, updateBook)
  .delete(auth, deleteBook);

module.exports = router;
