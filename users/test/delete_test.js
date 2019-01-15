const assert = require('assert');

const User = require('../src/user');

describe('deleting a user', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('model instance remove', done => {
    // ! joe => instance, krn harus di definisikan dlu
    joe
      .remove()
      .then(() => User.findOne({ name: 'joe' }))
      .then(user => {
        assert(user === null);
        done();
      })
      .catch(done);
  });

  it('class method remove', done => {
    // User => class/model yg di import
    // Remove a bunch of records with some given criteria
    User.deleteOne({ name: 'joe' })
      .then(() => User.findOne({ name: 'joe' }))
      .then(user => {
        assert(user === null);
        done();
      })
      .catch(done);
  });

  it('class method findAndRemove', done => {
    // User => class/model yg di import
    User.findOneAndRemove({ name: 'joe' })
      .then(() => User.findOne({ name: 'joe' }))
      .then(user => {
        assert(user === null);
        done();
      })
      .catch(done);
  });

  it('class method findByIdAndRemove', done => {
    // User => class/model yg di import
    User.findByIdAndRemove({ _id: joe._id })
      .then(() => User.findOne({ name: 'joe' }))
      .then(user => {
        assert(user === null);
        done();
      })
      .catch(done);
  });
});
