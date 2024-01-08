const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500

  const errorTitle = {
    400: 'Validation Error',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Server Error',
  }

  res.json({
    title: errorTitle[statusCode],
    message: err.message,
    stackTrace: err.stack,
  })
}

module.exports = errorHandler
