const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middlware', () => {
  let joe, blogPost;
  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });

    joe.blogPosts.push(blogPost);

    // karena sifat nya async & kita menjalankan 3 promise. kita bs refactor pakai Promise.all
    // joe.save();
    // blogPost.save();
    // comment.save();
    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it('User clean up dangling blogposts on remove', done => {
    // count => method dari monggose untuk mengecek ada berapa banyak collection di dalam model
    joe
      .remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
