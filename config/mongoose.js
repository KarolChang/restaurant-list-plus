// require mongoose
const mongoose = require('mongoose')
// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
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