const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')


const mongoUrl = 'mongodb://test:test@ds113738.mlab.com:13738/hy-full-stack'
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(middleware.logger)
app.use('/api/blogs', blogsRouter)
// app.use(middleware.error)

const server = http.createServer(app)

const PORT = process.env.PORT || 3003
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app,
  server
}