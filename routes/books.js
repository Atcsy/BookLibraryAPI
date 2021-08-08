const express = require('express');
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/books');

const { auth } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getBooks).post(auth, createBook);

router
  .route('/:id')
  .get(getBook)
  .put(auth, updateBook)
  .delete(auth, deleteBook);

module.exports = router;
