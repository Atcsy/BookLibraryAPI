const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Book = require('../models/Book');

// GET api/v1/books
exports.getBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({ succes: true, data: books });
});

// GET api/v1/books/:id
exports.getBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ succes: true, data: book });
});

// POST api/v1/books
exports.createBook = asyncHandler(async (req, res, next) => {
  const book = await Book.create(req.body);
  res.status(201).json({ success: true, data: book });
});

// PUT api/v1/books/:id
exports.updateBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ succes: true, data: book });
});

// DELETE api/v1/books/:id
exports.deleteBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true });
});
