const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Category Schema
const Category = new Schema({
  category: { type: String, required: true, unique: true }, // category name, unique, required
  posts: [{ type: Schema.Types.ObjectId, ref: 'post' }] // post, this is Ref array, contain _id
})

// Search
// TODO: Search
// All categories data
Category.statics.findAllCategoriesTitleAndSubTitle = function () {
  return this.find({}, { category: 1 })
    .sort({ category: 1 })
    .populate({
      path: 'posts',
      select: 'title subTitle date',
      sort: { date: -1 },
      populate: { path: 'category', select: 'category' }
    })
    .exec()
}
// Some categorys data
Category.statics.findSomeCategorysTitleAndSubTitle = function (category) {
  return this.findOne({ category })
    .sort({ category: 1 })
    .populate({
      path: 'posts',
      select: 'title subTitle, date',
      sort: { date: -1 },
      populate: { path: 'category', select: 'category' }
    })
    .exec()
}
// Find same category
Category.statics.findSameCategory = function (category) {
  return this.findOne({ category }).exec()
}
// Find same category
// Find Same Category using regular expression
// Don't care LowerCase or UpperCase
Category.statics.findSameCategoryRegex = function (category) {
  return this.findOne({ category: { $regex: category, $options: 'i' } }).exec()
}
// Search

// Create
// TODO: Create
// Create New Category
Category.statics.createCategory = function (category) {
  const Cart = new this({
    category
  })
  return Cart.save()
}
// Create

// Change
// TODO: Change
// Change Category Name
// Return changed category data
Category.statics.changeCategory = function (category, changeCategory) {
  return this.findOneAndUpdate({ category }, { category: changeCategory })
}
// Change

// Delete
// TODO: Delete
// Delete Category
// Return category's _id
Category.statics.deleteCategory = function (category) {
  return this.findOneAndRemove({ category })
    .select({ _id: 1 })
    .exec()
}
// Delete

/*

  Post task
  TODO: Post Task
*/

// $category$ ref push
// category: string, postID: ObjectID
Category.statics.PostsRefPush = function (category, postID) {
  return this.findOneAndUpdate({ category }, { $push: { posts: postID } })
}

// $category$ ref pop
// category: string,  postID: ObjectID
Category.statics.PostsRefPull = function (category, postID) {
  return this.findOneAndUpdate({ category }, { $pull: { posts: postID } })
}

// $post$ show
// category: string, title: string
Category.statics.showPost = function (category, title) {
  return this.findOne({ category })
    .select({ category: 1, posts: 1 })
    .populate({ path: 'posts', select: 'title subTitle mainText date', match: { title } })
    .exec()
}

// export
module.exports = mongoose.model('category', Category)
