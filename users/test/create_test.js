const assert = require('assert');

const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', done => {
    // creating new user
    const joe = new User({ name: 'Joe' });

    // save instance of model
    joe.save().then(() => {
      // Has joe been saved successfully?
      assert(!joe.isNew);
      done();
    });
  });
});

// done bisa dimasukkan di it & beforeEach
// ! done => callback
// ! JIka joe sudah tersimpan di database, maka joe.isNew akan bernilai false
// ! jadi !joe.isNews === true
// ! test assert akan berhasil jika, parameter nya true
