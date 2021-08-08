const moment = require('moment');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Book = require('../models/Book');
const User = require('../models/User');
const Rental = require('../models/Rental');

//POST api/v1/rentals/rent/:id (user)
exports.rentBook = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const book = await Book.findById(req.body.bookId);
  const rental = await Rental.find({ user: req.params.id });

  //If we dont have user or book respond error
  if (!user || !book) {
    return next(new ErrorResponse('Resource not found', 404));
  }
  if (rental.length >= 5) {
    return next(new ErrorResponse('Please return a book to rent another', 400));
  }

  //Get the DueBooks from rental collection
  const dueBooks = await Rental.find({
    user: {
      $eq: req.params.id,
    },
    returnDate: {
      $lt: Date.now(),
    },
  });

  if (dueBooks.length >= 1) {
    return next(new ErrorResponse('Please return overdue book(s) ', 400));
  }
  // check book is in stock
  if (book.inStock <= 0) {
    return next(
      new ErrorResponse(`Sorry, We dont have ${book.title} in stock`, 200)
    );
  }

  await Rental.create({
    book: book._id,
    issueDate: Date.now(),
    returnDate: moment().add(14, 'days').toDate(),
    user: user._id,
  });

  // decrement inStock by 1
  await book.updateOne({ $inc: { inStock: -1 } }, { runValidators: true });

  res
    .status(200)
    .json({ succes: true, message: `succefully rented ${book.title}` });
});

//POST api/v1/rentals/return/:id (user)
exports.returnBook = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const book = await Book.findById(req.body.bookId);
  const rental = await Rental.find({
    user: req.params.id,
    book: req.body.bookId,
  });

  //If we dont have user, book or any rental respond error
  if (!user || !book || rental.length === 0) {
    return next(new ErrorResponse('Resource not found', 404));
  }

  await Rental.findOneAndDelete({
    user: req.params.id,
    book: req.body.bookId,
  });

  // increment inStock by 1
  await book.updateOne({ $inc: { inStock: +1 } }, { runValidators: true });

  res.status(200).json({ succes: true, message: {} });
});

//GET api/v1/rentals/overdue/
exports.getOverDueRentals = asyncHandler(async (req, res, next) => {
  const overDuerentals = await Rental.find({
    returnDate: {
      $lt: Date.now(),
    },
  })
    .populate({
      path: 'book',
      select: 'title author',
    })
    .populate({
      path: 'user',
      select: 'name phone email',
    });

  if (overDuerentals.length === 0) {
    return next(new ErrorResponse('No overdue rentals found', 400));
  }

  res.status(200).json({ succes: true, message: overDuerentals });
});
