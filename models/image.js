'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = Schema({
    title: {
        type: String,
        required: [true, 'El título de la imágen es obligatorio'],
        minlength: [4, 'El título de la imágen debe tener al menos 4 caracteres'],
        maxlength: [250, 'El título de la imágen debe tener menos de 250 caracteres']
    },
    picture: {
        type: String,
        validate: {
            validator: function (pic) {
                let resp = true;
                if (pic) {
                    resp = false;
                    pic = pic.toLowerCase();
                    if (pic.endsWith('.jpg') || pic.endsWith('.png')) {
                        resp = true;
                    }
                }
                return resp;
            },
            message: 'La extensión de la imágen debe ser `.jpg` o `.png`'
        },
        maxlength: [250, 'La descripción debe tener menos de 250 caracteres']
    },
    album: {
        type: Schema.ObjectId,
        ref: 'album',
        required: [true, 'La imágen debe tener un álbum'],
    }
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;
