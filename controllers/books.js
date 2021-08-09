const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Book = require('../models/Book');

// GET api/v1/books
//pagination: ?page=2&limit=2
exports.getBooks = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.paginatedResult);
});

// GET api/v1/books/:id
exports.getBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorResponse('Resource not found', 404));
  }
  res.status(200).json({ succes: true, data: book });
});

// POST api/v1/books auth
exports.createBook = asyncHandler(async (req, res, next) => {
  const { title, author, year, pages, language, country } = req.body;

  const book = await Book.create({
    title,
    author,
    year,
    pages,
    language,
    country,
  });
  res.status(201).json({ success: true, data: book });
});

// PUT api/v1/books/:id auth
exports.updateBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    return next(new ErrorResponse('Resource not found', 404));
  }
  res.status(200).json({ succes: true, data: book });
});

// DELETE api/v1/books/:id auth
exports.deleteBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return next(new ErrorResponse('Resource not found', 404));
  }
  res.status(200).json({ success: true });
});
