const express = require('express')
const restaurant = require('../../models/restaurant.js')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

// search function
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()
  const userId = req.user._id
  return Restaurant.find({
    userId,
    '$or': [{
      name: { $regex: `${keyword}`, $options: '$i'}
    },{
      category: { $regex: `${keyword}`, $options: '$i'}
    }]
  })
    .lean()
    .then(restaurant => res.render('index', { restaurant, keyword }))
    .catch(err => console.log(err))
})

module.exports = router