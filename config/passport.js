const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = app => {
  // 初始化 passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('warning_msg', '此信箱未被註冊!'))
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, req.flash('warning_msg', '信箱或是密碼有誤!'))
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))
  // 設定 Facebook 登入策略 
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    // 設定和 facebook 要求開放的資料
    profileFields: ['email', 'displayName']
  },
  (accessToken, refreshToken, profile, done) => {
    const {email, name} = profile._json
    User.findOne({ email })
      .then(user => {
        // 如果存在，就回傳 user
        if (user) return done(null, user)
        // 如果不存在，就create user
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({ name, email, password: hash}))
          .then(user => done(null, user))
          .catch(err => console.log(err))
      })
  }
  ))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}