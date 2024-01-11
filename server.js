const getApp = require('./core/index')
const config = require('./config/index')

const app = getApp()
const port = config.get('app').port

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
