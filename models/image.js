'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = Schema({
    title: String,
    picture: String,
    album: {type: Schema.ObjectId, ref: 'album'}
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;
