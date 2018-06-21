const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Schema
const Ripple = new Schema({
  text: { type: String, required: true }, // Post ripple
  writer: { type: String, required: true }, // Ripple writer
  password: { type: String, required: true }, // Ripple writer password
  categoryID: { type: Schema.Types.ObjectId, ref: 'category', required: true }, // Category ID
  postID: { type: Schema.Types.ObjectId, ref: 'post', required: true }, // Post ID
  top: { type: Boolean, required: true }, // Top class ripple or not
  childRipple: [{ type: Schema.Types.ObjectId, ref: 'ripple' }], // Child Ripple ID's // It's only useful when top is true
  date: { type: Date, default: Date.now }, // Ripple date
  admin: { type: Boolean, default: false } // Admin value
})

// Search
// TODO: Search
// rippleID: ObjectID
Ripple.statics.searchOneRippleByID = function (rippleID) {
  // return founded
  return this.findOne({ _id: rippleID }).exec()
}
// category: string, title: string, writer: string
Ripple.statics.searchOneRipple = function (category, title, writer) {
  // return founded post data except password
  return this.findOne({ writer })
    .populate({ path: 'category', match: { category } })
    .populate({ path: 'posts', match: { title } })
    .select({ password: 0 })
    .exec()
}
// Search

// Ripple create
// TODO: Create
// text: string, writer: string, password: string, categoryID: ObjectID, postID: ObjectID
Ripple.statics.createRipple = function (categoryID, postID, writer, text, password, top) {
  const Cart = new this({
    text,
    writer,
    password,
    categoryID,
    postID,
    top
  })

  return Cart.save()
}
// Ripple create

// Ripple change
// TODO: Change
//
Ripple.statics.changeRipple = function () {}

// Ripple delete
// TODO: Delete
Ripple.statics.removeRipple = function (category) {
  return this.findOneAndRemove({ category })
}
// TODO: Delete
Ripple.statics.removeRippleAdmin = function () {}
// Ripple delete

// TODO: REFs
// Add ref in top class
Ripple.statics.rippleRefPush = function (parentID, childRippleID) {
  return this.findByIdAndUpdate(parentID, { $push: { childRipple: childRippleID } }).exec()
}

module.exports = mongoose.model('ripple', Ripple)
