import getApp from './core/index.js'
import config from './config/index.js'

const app = getApp()
const port = config.get('app').port

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
