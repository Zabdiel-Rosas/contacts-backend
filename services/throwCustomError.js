const throwCustomError = (statusCode, message) => {
  const error = new Error(message)
  error.status = statusCode
  throw error
}

module.exports = throwCustomError
