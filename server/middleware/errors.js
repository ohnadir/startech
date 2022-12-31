const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error'

    if (process.env.NODE_ENV === 'dev') {

        res.status(err.statusCode).json({
            Success: false,
            statusCode: err.statusCode,
            message: err.message
            /* success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack */
        })
    }
}