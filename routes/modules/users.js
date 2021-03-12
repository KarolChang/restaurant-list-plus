const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// Get login page
router.get('/login', (req, res) => {
  res.render('login')
})

// Get register page
router.get('/register', (req, res) => {
  res.render('register')
})

// Post login page
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}), (req, res) => {
  console.log(req.body)
})

// Post register page
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const registeredMessage = `${email} 註冊成功!`
  const errors = []
  // 判斷所有欄位(除了name)是否空白
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '除了name，所有欄位都是必填!' })
  }
  // 判斷 password 是否 = confirmPassword
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符!' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  // 判斷此 email 有沒有被註冊過
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個email已經被註冊過了!' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      } else {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({ name, email, password: hash }))
          .then(() => {
            req.flash('success_msg', '註冊成功!')
            res.render('login', { email, registeredMessage })
          })
          .catch(err => console.log(err))
      }
    })
})

// Get logout page
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router