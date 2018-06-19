const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Schema
const Post = new Schema({
  title: { type: String, unique: true, required: true }, // Title, unique
  subTitle: { type: String, required: true }, // Sub Title
  mainText: { type: String, required: true }, // Main Text
  category: { type: Schema.Types.ObjectId, required: true, ref: 'category' }, // Category
  comment: [{ type: Schema.Types.ObjectId, required: true, ref: 'postripple' }], // Post comment
  date: { type: Date, default: Date.now } // Post date
})

// Search
// TODO: Search
// Show the one Post
// category: string, title: string
Post.statics.findPost = function (category, title) {
  return this.findOne({ title })
    .select({ __v: 0 })
    .populate({ path: 'category', select: 'category', match: { category } })
    .exec()
}
// Show the one Post with Regex
// category: string, title: string
Post.statics.findPostRegex = function (category, title) {
  return this.findOne({ title: { $regex: title, $options: 'i' } })
    .select({ __v: 0 })
    .populate({ path: 'category', select: 'category', match: { category } })
    .exec()
}
// Search

// Post create
// TODO: Create
// category: ObjectID, title: string, subTitle: string, mainText: string
Post.statics.createPost = function (category, title, subTitle, mainText) {
  const post = new this({
    title,
    subTitle,
    mainText,
    category
  })

  // return the post
  return post.save()
}
// Post create

// Post change
// TODO: Change
// category: ObjectID, oldTitle: string, title: string, subTitle: string, mainText: string
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
// Post change

// Post remove
// TODO: Remove
// title: string
Post.statics.deletePost = function (title) {
  return this.findOneAndRemove({ title }).exec()
}
// When Category deleted, the (posts or post) of that category have to be removed
// Posts remove
// categoryID: ObjectID
Post.statics.deletePostsOfDeletedCategory = function (categoryID) {
  return this.remove({ category: categoryID }).exec()
}
// Post remove

// export
module.exports = mongoose.model('post', Post)
