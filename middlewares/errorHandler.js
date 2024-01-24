const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500

  const errorTitle = {
    500: 'Server Error',
  }

  res.status(statusCode).json({
    title: errorTitle[statusCode],
    message: err.message,
  })

  console.error('ERR STACKTRACE: ', err.stack)
}

module.exports = errorHandler
