// express
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

// mongoose
const mongoose = require('mongoose')
// mongo connect config file
const config = require('./config.js')
// port config
const port = process.env.PORT || 3001

// express start
const app = express()

// body parser
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))

// show http request
app.use(morgan('dev'))
// jwt secret key
app.set('jwt-secret', config.secret)
// Client React.js file
app.use(express.static(path.join(__dirname, 'build')))
// set server Route
app.use('/api', require('./routes/api'))
// Defalut route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'), err => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// mongo connect
mongoose.set('debug', true)
mongoose.connect(
  config.mongodbUri,
  { useNewUrlParser: true }
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log("We're connnected")
})

// Node server
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
})
