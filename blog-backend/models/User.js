const mongoose = require('mongoose')

const Schema = mongoose.Schema

// User Schema
const User = new Schema({
  username: String,
  password: String,
  admin: { type: Boolean, default: false }
})

// create new User document
User.statics.create = function (username, password) {
  const user = new this({
    username,
    password
  })

  // return the Promise
  return user.save()
}

// find Useranme
User.statics.findOneByUsername = function (username) {
  return this.findOne({
    username
  }).exec()
}

/*
  methods => if you have user data
  ex)
  const data = User.findOneByUsername(username)

  you can use method by data,
  like data.verify
*/
// check password === password
User.methods.verify = function (password) {
  return this.password === password
}

// Upgrade to Admin
User.methods.assignAdmin = function () {
  this.admin = true
  return this.save()
}

module.exports = mongoose.model('user', User)
