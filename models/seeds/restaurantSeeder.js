const Restaurant = require('../restaurant')
const User = require('../user')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const restaurantList = require('../../restaurant.json')
const SEED_USER = [
  { email: 'user1@example.com', password: '12345678' },
  { email: 'user2@example.com', password: '12345678' }
]

db.once('open', () => {
  SEED_USER.forEach((user, index) => {
    bcrypt.genSalt(10).then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        email: user.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from({ length: 3 }, (_, i) => Restaurant.create({
          ...restaurantList.results[(i + (index * 3))], userId
        })))
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
  })
})