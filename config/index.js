import dotenv from 'dotenv'

let instance
let config = {}

class Configuration {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!')
    }
    instance = this
  }

  getInstance() {
    return this
  }

  initialize() {
    dotenv.config()
    config = {
      app: {
        port: process.env.APP_PORT || 3000,
      },
      db: {
        connString: process.env.DB_CONN_STRING || '',
        host: process.env.DB_HOST || '',
        port: process.env.DB_PORT || '',
        name: process.env.DB_NAME || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASS || '',
      },
      auth: {
        secret: process.env.JWT_SECRET || '',
        expiration: '1h',
      },
    }
  }

  get(attr) {
    return config[attr]
  }
}

const singletonConfig = Object.freeze(new Configuration())
singletonConfig.initialize()

export default singletonConfig
