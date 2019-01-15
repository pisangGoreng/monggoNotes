const assert = require('assert');

const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe, maria, alex, zach;

  // ! beforeEach => HOOK dari monggose,
  // Jadi save instance ke monggose dlu, sebelum jalankan it function
  beforeEach(done => {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });

    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()]).then(() => done());
  });

  it('finds all users with a name of Joe', function(done) {
    User.find({ name: 'Joe' })
      .then(users => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      })
      .catch(done);
  });

  it('Find a user with particular ID', function(done) {
    User.findOne({ _id: joe._id })
      .then(user => {
        assert(user.name === 'Joe');
        done();
      })
      .catch(done);
  });

  // FOR PAGINATION
  it.only('can skip and limit the result set', done => {
    // Jika ingin ambil semua data, kosongkan saja parameter ny
    // sort => ya sorting, parameter nya nama property yg ingin kita sortir, value nya 1 => ascending, -1 => descending
    // skip => untuk melewati collection
    // limit => untuk membatasi berapa collection yang akan dikirim
    // alex, [joe, maria] zach
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(user => {
        console.log(user);
        assert(user.length === 2);
        assert(user[0].name === 'Joe');
        assert(user[1].name === 'Maria');
        done();
      });
  });
});
