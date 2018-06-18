const mongoose = require('mongoose')

const Schema = mongoose.Schema

// 스키마
const Post = new Schema({
  title: { type: String, unique: true }, // 포스트이름, 유니크
  subTitle: { type: String }, // 서브 타이틀, 간략하게 보여질 때 사용함
  mainText: { type: String, required: true }, // 포스트 내용, 스트링, 필수
  category: { type: Schema.Types.ObjectId, ref: 'category' }, // 카테고리, 스트링타입, 필수
  comment: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'postripple' }], // 포스트 댓글
  date: { type: Date, default: Date.now } // 포스팅 날짜
})

// show the title, subTitle and category
Post.statics.findAllPostsTitleAndSubTitle = function () {
  // Retury of Posts Category, SubTitle, Date
  return this.find(
    {},
    {
      _id: 0,
      __v: 0,
      mainText: 0,
      comment: 0
    }
  )
    .populate({ path: 'category', select: 'category -_id' })
    .sort({ date: -1 })
    .exec()
}

// show the one Post
Post.statics.findPost = function (title) {
  return this.findOne({ title }, { __v: 0 })
    .populate({ path: 'category', select: '__v' })
    .exec()
}

Post.statics.findPostRegex = function (title) {
  return this.findOne({ title: { $regex: title, $options: 'i' } }, { __v: 0 })
    .populate({ path: 'category', select: '__v' })
    .exec()
}

// post name double Check
Post.statics.checkTitle = function (title) {
  return this.findOne({ title }).exec()
}

// post Create
Post.statics.createPost = function (category, title, subTitle, mainText) {
  const post = new this({
    title,
    subTitle,
    mainText,
    category
  })

  return post.save()
}

// post Change
Post.statics.changePost = function (category, oldTitle, title, subTitle, mainText) {
  return this.findOneAndUpdate(
    { title: oldTitle },
    {
      title,
      subTitle,
      mainText,
      category
    }
  ).exec()
}

// 포스트 댓글 불러오는 함수
Post.statics.findComment = function (title) {
  return this.find({ title }).exec()
}

/*
  delete Post Task
*/
// post Remove
Post.statics.deletePost = function (title) {
  return this.remove({ title }).exec()
}

// delete posts when category deleted
Post.statics.deletePostsOfDeletedCategory = function (categoryID) {
  return this.remove({ category: categoryID }).exec()
}

module.exports = mongoose.model('post', Post)
