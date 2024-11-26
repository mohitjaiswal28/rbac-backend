/**
 * Custom error class for handling application-specific errors.
 * Extends the built-in Error class to provide a structured way
 * to manage operational errors in an Express application.
 *
 *
 * @param {string} message - The error message to be displayed.
 * @param {number} statusCode - The HTTP status code representing the error type (e.g., 404 for Not Found).
 * 
 * @example
 * // Creating an operational error
 * throw new AppError('This resource was not found', 404);
 *
 * This error class can be used to differentiate between operational errors (expected errors) 
 * and programming errors (bugs) in the application. Operational errors will be marked 
 * as operational (`isOperational = true`) for appropriate handling in the error middleware.
 */

class AppError extends Error {
    constructor(message, statusCode) {
        // Call the parent constructor with the message
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        // This is a programming error, so we want to mark it as operational
        this.isOperational = true;

        // Capture the stack trace which means the line number and file name where the error occurred
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
