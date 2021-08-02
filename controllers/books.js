exports.getBooks = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Show all books'})
};


exports.getBook = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Show book'})
};


exports.createBook = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Create book'})
};


exports.updateBook = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Update book'})  
};


exports.deleteBook = async (req, res, next) => {
    res.status(200).json({succes:true, msg: 'Delete book'})
};
