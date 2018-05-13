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

// 모든 포스트의
Post.statics.viewMainPage = function () {
  // 포스트의 카테고리, 타이틀, 부제목만 리턴
  return this.find(
    {},
    {
      title: 1,
      subTitle: 1,
      category: 1
    }
  )
    .sort({ date: -1 })
    .exec()
}

// 포스트 이름 중복 체크, 포스트 이름 찾기
Post.statics.checkTitle = function (title) {
  return this.findOne({ title }).exec()
}

// 포스트 생성 메소드
Post.statics.createPost = async function (category, title, subTitle, mainText) {
  return this.
}

// 포스트 수정 함수
Post.statics.Motify = function (category, title, oldTitle, subTitle, mainText) {
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

// 포스트 삭제
Post.statics.deletePost = function (title) {
  return this.remove({ title }).exec()
}

module.exports = mongoose.model('post', Post)
