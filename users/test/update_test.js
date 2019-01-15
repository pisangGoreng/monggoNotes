const assert = require('assert');

const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save().then(() => done());
  });

  // helper untuk assert
  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      })
      .catch(done);
  }

  it('instance type using set n save', done => {
    // pakai set untuk melakukan perubahan sedikit demi sedikit
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('a model instance can update', done => {
    assertName(joe.updateOne({ name: 'Alex' }), done);
  });

  it('a model class can update', done => {
    assertName(User.updateOne({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('a model class can update one record', done => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('a model class can find record with Id and update', done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });

  // Mongo Operator
  // Normal nya kita fetch data dari monggose, lalu kita ubah manual data nya
  // namun jika data nya ada banyak, ini akan jd performance issue
  // jadi monggoDb punya semacam helper, untuk meng instruksikan langsung megubah semua data
  // di monggose langsung
  it('a user can have their postcount incremented by 1', done => {
    // $inc => type operator
    User.updateOne({ name: 'Joe' }, { $inc: { likes: 1 } }).then(() => {
      User.findOne({ name: 'Joe' }).then(user => {
        assert(user.likes === 1);
        done();
      });
    });
  });
});

// kalau ada testcase yg tidak ingin dijalankan, tinggal tambahin x
// jadi xit
