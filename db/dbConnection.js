import mongoose from 'mongoose'
import singletonConfig from '../config/index.js'

const connectDb = async () => {
  const { host, port, name, user, password } = singletonConfig.get('db')
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

export default connectDb
