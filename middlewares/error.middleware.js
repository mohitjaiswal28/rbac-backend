
const AppError = require('../utils/appError.utils');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        name: err.name,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    // Programming or other unknown error: don't leak error details
    else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
}

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    err.message = err.message || 'Server error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {

        // Make sure to copy all properties from err
        let error = {
            ...err,
            name: err.name,
            message: err.message,
            statusCode: err.statusCode,
            status: err.status
        };

        // 1. Handle CastError
        if (error.name === 'CastError') error = handleCastErrorDB(error);

        // 2. Duplicate key error
        if (error.code === 11000) {
            const message = `Duplicate field value: ${Object.keys(error.keyValue).join(', ')}`;
            error = new AppError(message, 400);
        }

        // 3. Validation error
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(el => el.message);
            const message = `Invalid input data: ${errors.join('. ')}`;
            error = new AppError(message, 400);
        }

        sendErrorProd(error, res);
    }
};

module.exports = errorHandler;