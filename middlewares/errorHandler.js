const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500

  const errorTitle = {
    400: 'Validation Error',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Server Error',
  }

  res.status(statusCode).json({
    title: errorTitle[statusCode],
    message: err.message,
    stackTrace: err.stack,
  })
}

module.exports = errorHandler
