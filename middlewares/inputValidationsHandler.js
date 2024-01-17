const inputValidationsHandler = async (req, res, next, schema) => {
  try {
    const options = {
      abortEarly: false,
      convert: true,
    }
    await schema.validateAsync(req.body, options)
    return next()
  } catch (err) {
    console.error(err)
    return res.status(400).json(err)
  }
}

module.exports = inputValidationsHandler
