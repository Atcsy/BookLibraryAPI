const moment = require('moment');
const ErrorResponse = require('../utils/errorResponse');
const Book = require('../models/Book');
const User = require('../models/User');




exports.rentBook = async (req, res, next) => {   
    try {
        const user = await User.findById(req.params.id);

        
        //HANDLE USER//
        if (!user) {
            return next(
                new ErrorResponse('Resource not found', 404)
            );
        }
        
        //check the user for having 5 or more rented books
        if (user.booksRented.length >= 5){
            return next(
                new ErrorResponse('Please return a book to rent another', 401)
            );
        }

        //check user for having any expired rental and allow users without any rentals
        if (user.booksRented.length !== 0) {
            const expiredBooks = [];
            let daysDiff = 0;
            user.booksRented.forEach((data) => {
                daysDiff =  moment().diff(data.rentedDate, 'days');
                if (daysDiff > 14) {
                    expiredBooks.push(data.BookId);
                }
            });
            // the user has books with expired date
            if (expiredBooks.length !== 0) {
                return next(
                    new ErrorResponse('Please return book(s) with expired date first', 401)
                );
            }
        }
        
        //HANDLE BOOK ID//
        bookId = req.body.bookId;
        console.log(bookId);
        const book = await Book.findById(bookId);

        //check book is in stock
        if (book.inStock === 0) {
            return next(
                new ErrorResponse(`Sorry, We dont have ${book.title} in stock` , 200)
            );
        }
        // set the the bookId to a reference id from the book model and push to user model
        const obj = book.id;
        
        const data = {
            BookId: obj,
            rentedDate: moment().toDate()
        }
        user.booksRented.push(data);

        //Trasaction Implementation required!
        
        await user.save()
        book.inStock--;
        await book.save();

        res.status(200).json({ succes:true});



    } catch (error) {
        next(error);
    }
};


