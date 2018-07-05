'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = Schema({
    title: String,
    description: String
});

const Album = mongoose.model('album', AlbumSchema);

module.exports = Album;
