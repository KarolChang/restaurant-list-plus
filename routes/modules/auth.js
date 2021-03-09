const express = require('express')
const passport = require('passport')
const router = express.Router()

// 使用者點擊按鈕後，向 Facebook 發出請求
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

// Facebook 把資料發回來的地方
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router