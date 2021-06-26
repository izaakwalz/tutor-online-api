const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  userId: {
    type: Number,
    required: [true, 'user id is required'],
  },
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  body: { type: String, required: [true, 'body is requried'] },
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;
