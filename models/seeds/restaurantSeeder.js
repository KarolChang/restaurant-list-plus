const Restaurant = require('../restaurant')
const User = require('../user')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const restaurantList = require('../../restaurant.json')
const SEED_USER_ONE = { email: 'user1@example.com', password: '12345678' }
const SEED_USER_TWO = {email: 'user2@example.com', password: '12345678'}

function generateData (userInfo, index_one, index_two) {
  db.once('open', () => {
    bcrypt.genSalt(10).then(salt => bcrypt.hash(userInfo.password, salt))
      .then(hash => {
        return User.create({
          email: userInfo.email,
          password: hash
        })
          .then(user => {
            const userId = user._id
            const restaurants = restaurantList.results.slice(index_one, index_two)
            const restaurantsForUser = restaurants.map(restaurant => {
              restaurant.userId = userId
              return restaurant
            })
            return Promise.all([Restaurant.create(restaurantsForUser)])
          })
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
  })
}

generateData (SEED_USER_ONE, 0, 3)
generateData (SEED_USER_TWO, 3, 6)