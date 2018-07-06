const assert = require('assert');
const Album = require('../models/album');

describe('Finding records', function () {
  let album;

  beforeEach(function (done) {
    album = new Album({
      title: 'Patagonia 2017',
      description: 'Vacaciones en Patagonia'
    });
    album.save().then(function () {
      done();
    });
  });

  it('Find album by title', function (done) {
    const titulo = 'Patagonia 2017';
    Album.findOne({title: titulo}).then(function (result) {
      assert(result.title === titulo);
      done();
    });
  });

  it('Find album by id', function (done) {
    Album.findOne({_id: album._id}).then(function (result) {
      assert(result._id.toString() === album._id.toString());
      done();
    });
  });

});
