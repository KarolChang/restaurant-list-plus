// require mongoose
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI
// connect to mongodb
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
// get status of connection
const db = mongoose.connection
// set action of connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

module.exports = db