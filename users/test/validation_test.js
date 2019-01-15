const assert = require('assert');

const User = require('../src/user');

describe('Validating records', () => {
  it('require a user name ', () => {
    const user = new User({ name: undefined });

    // validateSync => method bawaan dari user schema, untuk melakukan validasi
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');
  });

  it("requires a use'r name longer than 2 characters", () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 character.');
  });

  it('disallows invalid records from being saved', done => {
    // test case untuk menampilkan error ke user, jika ada kesalahan
    // proses save gagal karena validasi, makanya masuk ke catch
    // perhatikan, ada done() di dalam catch
    const user = new User({ name: 'Al' });
    user.save().catch(validationResult => {
      const { message } = validationResult.errors.name;
      assert(message === 'Name must be longer than 2 character.');
      done();
    });
  });
});
