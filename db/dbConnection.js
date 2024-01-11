const mongoose = require('mongoose')
const config = require('../config/index')

const connectDb = async () => {
  const { host, port, name, user, password } = config.get('db')
  const connString = `mongodb+srv://${user}:${password}@${host}${
    port && `:${port}`
  }/${name}?retryWrites=true&w=majority`

  try {
    const connect = await mongoose.connect(connString)
    console.log(
      'Database connected: ',
      connect.connection.host,
      connect.connection.name
    )
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDb
