const assert = require('assert');

const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subDocument', done => {
    const joe = new User({ name: 'Joe', posts: [{ title: 'ini post' }] });
    // Cara test, save instance joe, lalu cari nama joe di dalam dabase
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts[0].title === 'ini post');
        done();
      });
  });

  it('can add subDocuments to an existing record', done => {
    // create joe
    // save joe
    // fetch joe
    // add new posts to joe
    // save joe
    // fetch joe
    // make assertion
    const joe = new User({ name: 'Joe', posts: [] });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        user.posts.push({ title: 'New post' });
        // yg di return user.save(), supaya bisa chain promise
        // jadi .then() selanjutnya adalah hasil dari user.save()
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts[0].title === 'New post');
        done();
      });
  });

  it('can remove an existing document', done => {
    const joe = new User({ name: 'Joe', posts: [{ title: 'new title' }] });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        const post = user.posts[0];
        post.remove();

        // .remove => API dari monggose untuk membuang data dari monggose
        // jadi daripada repot2 pake slice array nya, cukup pakai ini aja
        // DONT DO THIS:
        // joe.remove()

        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
