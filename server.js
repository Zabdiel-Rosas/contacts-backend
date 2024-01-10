const getApp = require('./core/index')

const { app, port } = getApp()

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
