const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  // BlogPost akan memiliki banyak comment
  // disini kita me refrence ke collection yang lain
  // jadi bukan membuat subDocument, tp hanya menyimpan id sebagai reference
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
