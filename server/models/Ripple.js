const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Ripple = new Schema({
  ripple: String,
  date: { type: Date, default: Date.now }
})

// create new User document
Ripple.statics.create = function(ripple) {
  if (ripple === '') throw new Error('None Input Data')

  const message = new this({
    ripple
  })

  // return the Promise
  return message.save()
}

// 댓글 다 불러오기
Ripple.statics.lists = function() {
  return this.find().exec()
}

module.exports = mongoose.model('ripple', Ripple)
