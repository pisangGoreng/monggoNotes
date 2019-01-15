// This is model file
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'], // message jika name tidak terisi
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 character.' // message jika gagal validasi
    }
  },
  posts: [PostSchema], // subDocument => refrensi ke schema di file lain
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogPost'
    }
  ]
});

// virtual type
// ini sama seperti membuat postCount property di dalam userSchema.
// jangan pakai arrow function jk ingin membuat virtual type
UserSchema.virtual('postCount').get(function() {
  // this me representasikan isi userSchema
  return this.posts.length;
});

// MONGGOSE MIDDLEWARE
// karena middleware bersifat async, maka kita perlu masukkan params next()
// ini sifatnya sama seperti done()
// jadi tunggu proses selesai, baru next() ke middleware selanjutnya
UserSchema.pre('remove', function(next) {
  // this === joe
  // this => refrence ke schem User

  const BlogPost = mongoose.model('blogPost');

  // ini untuk looping menghapus semua blogpost
  // $in => operator mongoose
  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => {
    next();
  });
});

// DEFINE USER MODEL
// user => jadi nama model, yang bisa di refrensikan ke schema lain
const User = mongoose.model('user', UserSchema);

module.exports = User;

// User => all collection of data
// 'user' => collection name inside mongo
