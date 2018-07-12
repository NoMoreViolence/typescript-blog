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
  date: { type: Date, default: Date.now } // Ripple date
})

// Search
// TODO: Search
// rippleID: ObjectID
Ripple.statics.searchOneRippleByID = function (rippleID, passwordShow) {
  // return founded
  return this.findOne({ _id: rippleID })
    .select({ password: passwordShow })
    .exec()
}
// category: string, title: string, writer: string, passwordShow: number
Ripple.statics.searchOneRipple = function (category, title, writer, passwordShow) {
  // return founded post data
  return this.findOne({ writer })
    .populate({ path: 'category', match: { category } })
    .populate({ path: 'posts', match: { title } })
    .select({ password: passwordShow })
    .exec()
}
// category: string, title: string, writer: string, passwordShow: number
Ripple.statics.searchRipple = function (category, title, writer, passwordShow) {
  // return founded post data
  return this.find({ writer })
    .populate({ path: 'category', match: { category } })
    .populate({ path: 'posts', match: { title } })
    .select({ password: passwordShow })
    .exec()
}
// categoryID: ObjectID, postID: ObjectID, passwordShow: number
Ripple.statics.searchTopRipple = function (categoryID, postID, passwordShow) {
  // return founded ripple data
  return this.find({ categoryID, postID, top: true })
    .select({ password: passwordShow })
    .sort({ date: -1 })
    .exec()
}
// childRippleArray: string[]
Ripple.statics.searchChildRipple = function (childRippleArray, passwordShow) {
  // Return founded ripple data
  return this.find({ _id: { $in: childRippleArray }, top: false })
    .select({ password: passwordShow })
    .sort({ date: 1 })
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

// TODO: valid check
// ObjectID: string
Ripple.statics.checkObjectID = function (ObjectID) {
  if (mongoose.Types.ObjectId.isValid(ObjectID) === true) {
    return true
  }
  return false
}

// Post, Category Actions
// TODO: if Changed Post, the categoryID should be updated
Ripple.statics.categoryIdUpdate = function (oldCategoryID, oldPostID, newCategoryID) {
  return this.update({ categoryID: oldCategoryID, postID: oldPostID }, { categoryID: newCategoryID }, { multi: true }).exec()
}
Ripple.statics.deleteAllByCategoryIDAndPostID = function (categoryID, postID) {
  return this.remove({ categoryID, postID })
}
Ripple.statics.deleteAllByCategoryID = function (categoryID) {
  return this.remove({ categoryID })
}

module.exports = mongoose.model('ripple', Ripple)
