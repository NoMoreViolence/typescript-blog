const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Category Schema
const Category = new Schema({
  category: { type: String, required: true, unique: true }, // 카테고리 이름, 필수, 유니크함, 공백을 없앰
  posts: [{ type: Schema.Types.ObjectId, ref: 'post' }] // 포스트 populate 사용 하기 위해서 ref로 포스트들 저장될 디비를 가리킴 허허
})

// whole category print
Category.statics.findAllCategories = function () {
  return this.find({})
    .sort({ category: 1 })
    .exec()
}

// bring title in posts of category
Category.statics.findPostNames = function (category) {
  // bring title, when you use populate, only bring select value
  return this.findOne({ category })
    .populate({ path: 'posts', select: 'title' })
    .exec()
  // .populate({ path: 'posts', select: 'title', match: { title: '백준 알고리즘 풀이 6' } })
}

// Category Double Check
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

// Change Category Name
Category.statics.changeCategory = function (category, changeCategory) {
  return this.findOneAndUpdate({ category }, { category: changeCategory }).exec()
}

// Delete Category
Category.statics.deleteCategory = function (category) {
  this.findOneAndRemove({ category }).exec()
}

// Update post ref in Category schema
Category.statics.update = function (newPosts, category) {
  // 일단 posts를 업데이트 하네요 이게 먼저 되야해서 await 걸어 주었습니다
  return this.findOneAndUpdate({ category }, { posts: newPosts })
}

// export
module.exports = mongoose.model('category', Category)
