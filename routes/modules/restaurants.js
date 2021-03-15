const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

// create restaurant info
router.get('/create', (req, res) => {
  res.render('create')
})

// storage new info to database
router.post('/', (req, res) => {
  const restaurantList = req.body
  // 如果電話號碼格式錯誤
  if (restaurantList.phone) {
    if (!restaurantList.phone.match(/^(\([0-9]{3}\)\s*|[0-9]{2}\-)[0-9]{4}-[0-9]{4}$/)) {
      const phoneMessage = '電話格式有誤!'
      return res.render('create', { restaurantList, phoneMessage })
    }
  }
  // 如果沒有圖片，加上圖片
  if (!restaurantList.image) {
    restaurantList.image = 'http://pic.90sjimg.com/design/00/16/13/58/5927ba7d32927.png'
  }
  // 加上 userId 欄位
  const userId = req.user._id
  restaurantList.userId = userId
  return Restaurant.create(restaurantList)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// read details of the restaurant
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// edit infos of the restaurant
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const restaurantList = req.body
  restaurantList._id = _id
  // 如果電話號碼格式錯誤
  if (restaurantList.phone) {
    if (!restaurantList.phone.match(/^(\([0-9]{3}\)\s*|[0-9]{2}\-)[0-9]{4}-[0-9]{4}$/)) {
      const phoneMessage = '電話格式有誤!'
      return res.render('edit', { restaurant: restaurantList, phoneMessage })
    }
  }
  // 如果沒有圖片，加上圖片
  if (!restaurantList.image) {
    restaurantList.image = 'http://pic.90sjimg.com/design/00/16/13/58/5927ba7d32927.png'
  }
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, restaurantList)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// delete the restaurant
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router