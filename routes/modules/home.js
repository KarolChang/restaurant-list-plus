const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant.js')

// put default info to index-page
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

// sort function
const currentSort = { name: '店名(正序)', name_desc: '店名 (反序)', category: '類別 (正序)', category_desc: '類別 (反序)', rating_desc: '評比 (由高到低)', rating: '評比 (由低到高)' }
router.post('/', (req, res) => {
  let sort = req.body.sort
  const sortName = currentSort[sort]
  let sortWay = 'asc'
  if (sort.includes('_desc')) {
    sort = sort.slice(0, sort.indexOf('_'))
    sortWay = 'desc'
    sortRestaurant(sort, sortWay, res, sortName, req)
  }
  sortRestaurant(sort, sortWay, res, sortName, req)
})

// function
function sortRestaurant(sort, sortWay, res, sortName, req) {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ [sort]: sortWay })
    .then(restaurant => res.render('index', { restaurant, sortName }))
    .catch(error => console.error(error))
}

module.exports = router


