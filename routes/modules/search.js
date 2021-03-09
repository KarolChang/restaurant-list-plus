const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

// search function
router.get('/', (req, res) => {
  const restaurant = []
  const keyword = req.query.keyword
  Restaurant.find().lean()
    .then(restaurants => {
      restaurants.forEach(store => {
        if (store.name.toLowerCase().includes(keyword.toLowerCase())) {
          restaurant.push(store)
        }
      })
    })
  res.render('index', { restaurant, keyword })
})

module.exports = router