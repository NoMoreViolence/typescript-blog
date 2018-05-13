// 포스트별로 달릴 댓글 모음
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostRipple = new Schema({
  title: { type: String, require: true }, // 포스트이름
  text: { type: String, require: true }, // 댓글
  date: { type: Date, default: Date.now } // 포스팅 날짜
})

// 카테고리 생성!
PostRipple.statics.create = function (category) {
  const Cart = new this({
    category
  })

  // 세이브
  return Cart.save()
}

// 여기서 ref 걸어서 찾아와야 하는데 이 부분은 그냥 패스하겠음, 내가 하기 싫기도 하고 그냥 안해 나중에... 처음 하는 부분
PostRipple.statics.findByCategory = function (category) {
  return this.find({ category }).exec()
}

// 이름 같은 카테고리 삭제하는 부분, 이런 부분들 모두에게 미들워에로 관리자 체크를 걸어두어야 합니다
PostRipple.statics.remove = function (category) {
  return this.remove({ category })
}

module.exports = mongoose.model('postripple', PostRipple)
