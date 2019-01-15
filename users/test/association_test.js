const assert = require('assert');

const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Assoctions', () => {
  let joe, blogPost, comment;
  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on great post' });

    // ini cara me refrensikan blogpost ke user
    // refrence ini hanya terjadi di node.js, bukan di database
    // jadi mirip nesting
    // nanti secara otomatis, monggose akan ambil ._id dari blogpost untuk dimasukkan ke schema

    // joe / user has many blogpost
    joe.blogPosts.push(blogPost);

    // blogpost has many comment
    blogPost.comments.push(comment);

    // comment have one joe / user
    comment.user = joe;

    // karena sifat nya async & kita menjalankan 3 promise. kita bs refactor pakai Promise.all
    // joe.save();
    // blogPost.save();
    // comment.save();
    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => done());
  });

  it('saves a relati on between a user and blogpost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts') // => // load up any associated blogPosts in user
      .then(user => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  it('save a full relation graph', done => {
    User.findOne({ name: 'Joe' })
      // populate user => blogPosts => comments => user
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments', // nama property di schema
          model: 'comment', // nama model yang kita define
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });
});
