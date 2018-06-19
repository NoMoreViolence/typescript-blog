const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Schema
const PostRipple = new Schema({
  text: { type: String, required: true }, // Post ripple
  writer: { type: String, required: true }, // Ripple writer
  password: { type: String, required: true }, // Ripple writer password
  categoryID: { type: Schema.Types.ObjectId, ref: 'category', required: true }, // Category ID
  postID: { type: Schema.Types.ObjectId, ref: 'post' }, // Post ID
  date: { type: Date, default: Date.now } // Ripple date
})

// Search
// TODO: Search
// writer: string
PostRipple.statics.searchComment = function (writer) {
  // return founded post data except password
  return this.findOne({ writer })
    .select({ password: 0 })
    .exec()
}
// Search

// Ripple create
// TODO: Create
// text: string, writer: string, password: string, categoryID: ObjectID, postID: ObjectID
PostRipple.statics.createComment = function (text, writer, password, categoryID, postID) {
  const Cart = new this({
    text,
    writer,
    password,
    categoryID,
    postID
  })

  return Cart.save()
}
// Ripple create

// Ripple change
// TODO: Change
//
PostRipple.statics.changeComment = function () {}

// Ripple delete
// TODO: Delete
PostRipple.statics.removeComment = function (category) {
  return this.findOneAndRemove({ category })
}
// TODO: Delete
PostRipple.statics.removeCommentAdmin = function () {}
// Ripple delete

module.exports = mongoose.model('postripple', PostRipple)
