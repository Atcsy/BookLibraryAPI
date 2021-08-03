const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    // console.log(err.stack);

    if(err.name === 'CastError') {
        const message =  `Resource not found with if of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    res.status(error.statusCode || 500).json({
        succes: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;