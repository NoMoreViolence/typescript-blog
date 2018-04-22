// 카테고리
const Category = require('./Category');
// 포스트 별 리플
const PostRipple = require('./PostRipple');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 스키마
const Post = new Schema({
  title: { type: String, unique: true }, // 포스트이름, 유니크
  subTitle: { type: String }, // 서브 타이틀, 간략하게 보여질 때 사용함
  mainText: { type: String, required: true }, // 포스트 내용, 스트링, 필수
  category: { type: String, required: true }, // 카테고리, 스트링타입, 필수
  comment: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'postripple' }, // 댓글들 모음, 필수! 는 아닌데...
  ], // 포스트에 달릴 댓글!
  date: { type: Date, default: Date.now }, // 포스팅 날짜
});

// 모든 포스트의
Post.statics.viewMainPage = function() {
  // 포스트의 카테고리, 타이틀, 부제목만 리턴
  return this.find(
    {},
    {
      title: 1,
      subTitle: 1,
      category: 1,
    }
  )
    .sort({ date: -1 })
    .exec();
};

// 포스트 이름 중복 체크, 포스트 이름 찾기
Post.statics.checkTitle = function(title) {
  return this.findOne({ title }).exec();
};

// 포스트 생성 메소드
Post.statics.createPost = async function(category, title, subTitle, mainText) {
  const post = new this({
    title,
    subTitle,
    mainText,
    category,
  });
  // 일단 포스트를 생성하고
  await post.save();
  // 카테고리의 Ref 업데이트 해야 되기 때문에 생성된 후의 같은 카테고리의 _id값만 리턴해줌!
  return this.find(
    { category },
    {
      title: 0,
      subTitle: 0,
      mainText: 0,
      category: 0,
      comment: 0,
      date: 0,
    }
  ).exec();
};

// 포스트 수정 함수
Post.statics.Motify = function(category, title, oldTitle, subTitle, mainText) {
  return this.findOneAndUpdate(
    { title: oldTitle },
    { title, subTitle, mainText, category }
  ).exec();
};

// 포스트 댓글 불러오는 함수
Post.statics.findComment = function(title) {
  return this.find({ title }).exec();
};

// 포스트 삭제
Post.statics.deletePost = function(title) {
  return this.remove({ title }).exec();
};

module.exports = mongoose.model('post', Post);
