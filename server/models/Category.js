const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 카테고리 스키마
const Category = new Schema({
  category: { type: String, required: true, unique: true }, // 카테고리 이름, 필수, 유니크함, 공백을 없앰
  posts: [{ type: Schema.Types.ObjectId, ref: 'post' }] // 포스트 populate 사용 하기 위해서 ref로 포스트들 저장될 디비를 가리킴 허허
})

// 전체 카테고리 출력
Category.statics.findAllCategories = function() {
  return this.find({})
    .sort({ category: 1 })
    .exec()
}

// bring title in posts of category
Category.statics.findPostNames = function(category) {
  // 이렇게 하면 posts의 title 값만 가져올 수 있습니다
  return this.findOne({ category })
    .populate({ path: 'posts', select: 'title' })
    .exec()
  // .populate({ path: 'posts', select: 'title', match: { title: '백준 알고리즘 풀이 6' } })
}

// Category Double Check
Category.statics.findSameCategory = function(category) {
  return this.findOne({ category }).exec()
}

// add New Category
Category.statics.createCategory = function(category) {
  const Cart = new this({
    category
  })

  return Cart.save()
}

// Change Category Name
Category.statics.changeCategory = function(category, changeCategory) {
  return this.findOneAndUpdate({ category }, { category: changeCategory }).exec()
}

// Delete Category
Category.statics.deleteCategory = function(category) {
  this.findOneAndRemove({ category }).exec()
}

// 포스트들의 정보가 변경(추가, 변경, 삭제) 되었을 때 Ref 한번에 정리해버리는 함수
Category.statics.update = function(newPosts, category) {
  // 일단 posts를 업데이트 하네요 이게 먼저 되야해서 await 걸어 주었습니다
  return this.findOneAndUpdate({ category }, { posts: newPosts })
}

// 익스포트
module.exports = mongoose.model('category', Category)
