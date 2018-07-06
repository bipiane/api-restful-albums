'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        minlength: [4, 'El título debe tener al menos 4 caracteres'],
        maxlength: [250, 'El título debe tener menos de 250 caracteres']
    },
    description: {
        type: String,
        maxlength: [250, 'La descripción debe tener menos de 250 caracteres']
    },
});

const Album = mongoose.model('album', AlbumSchema);

module.exports = Album;
