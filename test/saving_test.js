const assert = require('assert');
const Album = require('../models/album');
const Image = require('../models/image');

describe('Saving objects', function () {
  const album = new Album({
    title: 'USA-Europa abril 2018',
    description: 'Vacaciones en USA y Europa'
  });

  it('Save album', function (done) {
    album.save().then(function () {
      assert(!album.isNew);
      done();
    });
  });

  it('Save image', function (done) {
    const image = new Image({
      title: 'Brooklyn bridge',
      picture: null,
      album: album
    });

    image.save().then(function () {
      assert(!image.isNew);
      done();
    });
  });

});
