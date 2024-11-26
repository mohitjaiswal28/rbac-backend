
/* 
 * catchAsync() will be used to catch the errors in async functions
 * It will be used as a wrapper function for all async functions
 * It will catch the error and pass it to the next middleware which is the global error handler
*/
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};