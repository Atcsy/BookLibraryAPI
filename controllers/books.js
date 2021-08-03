const Book = require('../models/Book');

exports.getBooks = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Show all books'})
};


exports.getBook = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Show book'})
};


exports.createBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({
            success:true,
            data: book
        });
    } catch (err) {
        res.status(400).json({succes: false, error: err.message});
    }
};


exports.updateBook = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Update book'})  
};


exports.deleteBook = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Delete book'})
};
