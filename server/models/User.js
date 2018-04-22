const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  password: String,
  admin: { type: Boolean, default: false }
});

// create new User document
User.statics.create = function(username, password) {
  const user = new this({
    username,
    password
  });

  // return the Promise
  return user.save();
};

// 유저네임 찾기!
User.statics.findOneByUsername = function(username) {
  return this.findOne({
    username
  }).exec();
};

// 패스워드 같은지 확이해주는 함수랍니다
User.methods.verify = function(password) {
  return this.password === password;
};

User.methods.assignAdmin = function() {
  this.admin = true;
  return this.save();
};

module.exports = mongoose.model('user', User);
