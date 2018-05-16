const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Category Schema
const Category = new Schema({
  category: { type: String, required: true, unique: true }, // category name, unique, required
  posts: [{ type: Schema.Types.ObjectId, ref: 'post' }] // post, this is Ref array, contain _id
})

// whole category print
Category.statics.findCategoryOrCategories = function (category) {
  // all category
  if (category === 'categories') {
    return this.find({}, { category: 1 })
      .populate({
        path: 'posts',
        select: 'title subTitle date',
        options: { sort: { date: -1 } },
        populate: { path: 'category', select: 'category' }
      })
      .sort({ category: 1 })
      .exec()
  }
  // seleted category
  return this.find({ category }, { category: 1 })
    .populate({ path: 'posts', select: 'title subTitle date', options: { sort: { date: -1 } } })
    .sort({ category: 1 })
    .exec()
}

// bring title in posts of category
Category.statics.findPostNamesAndSubTitleOfCategory = function (category) {
  // bring title, when you use populate, only bring select value
  return this.findOne({ category })
    .populate({ path: 'posts', select: 'title subTitle' })
    .exec()
  // .populate({ path: 'posts', select: 'title', match: { title: '백준 알고리즘 풀이 6' } })
}

// if there is category, return category, else, return null
Category.statics.findSameCategory = function (category) {
  return this.findOne({ category }).exec()
}

// add New Category
Category.statics.createCategory = function (category) {
  const Cart = new this({
    category
  })
  // save
  return Cart.save()
}

// Change Category Name and return changed category data
Category.statics.changeCategory = function (category, changeCategory) {
  return this.findOneAndUpdate({ category }, { category: changeCategory }).exec()
}

// Delete Category and return category's _id
Category.statics.deleteCategory = function (category) {
  // delete, and return deleted category's _id because posts has category's _id
  return this.findOneAndRemove({ category }, { select: '_id' }).exec()
}

/*

  Post task

*/

// $category$ ref push
// return category
Category.statics.PostsRefPush = function (category, postID) {
  return this.findOneAndUpdate({ category }, { $push: { posts: postID } })
}

// $category$ ref pop
// return category
Category.statics.PostsRefPop = function (category, postID) {
  return this.findOneAndUpdate({ category }, { $pop: { posts: postID } })
}

// $post$ show
// return post data
Category.statics.showPost = function (category, title) {
  return this.findOne(
    { category },
    {
      _id: 0,
      __v: 0
    }
  ).populate({ path: 'posts', select: '-__v -category', match: { title } })
}

// export
module.exports = mongoose.model('category', Category)
