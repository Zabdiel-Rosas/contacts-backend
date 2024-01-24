const inputValidationsHandler = async (req, res, next, schema) => {
  try {
    const options = {
      abortEarly: false,
      convert: true,
    }
    await schema.validateAsync(req.body, options)
    return next()
  } catch (err) {
    const errors = err.details.map((item) => {
      return {
        property: item.context.label,
        message: item.message,
        type: 'Input',
      }
    })

    console.error(err)
    return res.status(400).json(errors)
  }
}

module.exports = inputValidationsHandler
