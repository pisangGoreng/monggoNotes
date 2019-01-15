const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// untuk hide notification
// (node: 13388) DeprecationWarning: collection.findAndModify is deprecated.Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
mongoose.set('useFindAndModify', false);

// Test koneksi ke mongoose
before(done => {
  mongoose.connect(
    'mongodb://localhost/users_test',
    { useNewUrlParser: true }
  );

  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Warning ', error);
    });

  // ! users_test => nama instance database
  // ! once & .on => event handler monggose
});

beforeEach(done => {
  // Mongoose secara otomatis mengubah semua nama collections menjadi LOWERCASE & PLURAL
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done(); // => Ready to run the next test
      });
    });
  });
});

// ! beforeEach => HOOK dari monggose,
// ! HOOK => function yang akan selalu di jalankan sebelum test case
// done bisa dimasukkan di it & beforeEach
// kita hapus semua collections di users, sebelum connect dijalankan,
// ini untuk keperluan test
