const Book = require('../models/Book');

exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json({ succes:true, data: books });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};


exports.getBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(400).json( {success: false} );
        }
        res.status(200).json({ succes:true, data: book });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};


exports.createBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ success: true, data: book });
    } catch (err) {
        res.status(400).json({ succes: false, error: err.message });
    }
};


exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!book) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ succes: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};


exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if(!book){
            return res.status(400).json({ succes: false })
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};