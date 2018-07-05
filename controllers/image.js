'use strict';

const path = require('path');
const Image = require('../models/image');
const Album = require('../models/album');

function pruebas(req, res) {
    res.status(200).send({message: 'Pruebas de controlador de imagenes'});
}

function getImage(req, res) {
    const imageId = req.params.id;

    Image.findById(imageId, (err, image) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!image) {
                res.status(404).send({message: 'No existe la imagen'});
            }
            else {
                Album.populate(image, {path: 'album'}, (err, image) => {
                    if (err) {
                        res.status(500).send({message: 'Error en la petición'});
                    } else {
                        res.status(200).send({image});
                    }
                });
            }
        }
    });
}

function getImages(req, res) {
    const albumId = req.params.album;

    let find;
    if (!albumId) {
        // Sacar todas las imagenes de bbdd
        find = Image.find({}).sort('title');
    } else {
        // Sacar todas las imagenes asociadas el album
        find = Image.find({album: albumId}).sort('title');
    }
    find.exec((err, images) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!images) {
                res.status(404).send({message: 'No hay imágenes en este album !!'});
            }
            else {
                Album.populate(images, {path: 'album'}, (err, images) => {
                    if (err) {
                        res.status(500).send({message: 'Error en la petición'});
                    } else {
                        res.status(200).send({images});
                    }
                });
            }
        }
    });
}

function saveImage(req, res) {
    const image = new Image();

    const params = req.body;
    image.title = params.title;
    image.picture = null;
    image.album = params.album;

    image.save((err, imageStored) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!imageStored) {
                res.status(404).send({message: 'No se ha guardado la imagen!!'});
            }
            else {
                res.status(200).send({image: imageStored});
            }
        }
    });
}

function updateImage(req, res) {
    const imageId = req.params.id;
    const update = req.body;

    Image.findByIdAndUpdate(imageId, update, (err, imageUpdated) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!imageUpdated) {
                res.status(404).send({message: 'No se ha actualizado la imagen!!'});
            }
            else {
                res.status(200).send({image: imageUpdated});
            }
        }
    });
}

function deleteImage(req, res) {
    const imageId = req.params.id;

    Image.findByIdAndRemove(imageId, (err, imageRemoved) => {
        if (err) {
            res.status(500).send({message: 'Error al borrar la imagen'});
        } else {
            if (!imageRemoved) {
                res.status(404).send({message: 'No se ha podido eliminar la imagen!!'});
            }
            else {
                res.status(200).send({image: imageRemoved});
            }
        }
    });
}

function uploadImage(req, res) {
    const imageId = req.params.id;

    if (req.files) {
        const file_path = req.files.image.path;
        const file_split = file_path.split('/');
        const file_name = file_split[1];

        Image.findByIdAndUpdate(imageId, {picture: file_name}, (err, imageUpdated) => {
            if (err) {
                res.status(500).send({message: 'Error en la petición'});
            } else {
                if (!imageUpdated) {
                    res.status(404).send({message: 'No se ha actualizado la imagen!!'});
                }
                else {
                    //res.status(200).send({image: imageUpdated});
                    getImage(req, res)
                }
            }
        });
    } else {
        res.status(200).send({message: 'No has subido ninguna imagen!!'});
    }
}

const fs = require('fs');

function getImageFile(req, res) {
    const imageFile = req.params.imageFile;

    fs.exists('./uploads/' + imageFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve('./uploads/' + imageFile));
        } else {
            res.status(200).send({message: 'No existe la imagen!!'});
        }
    });
}

module.exports = {
    pruebas,
    getImage,
    getImages,
    saveImage,
    updateImage,
    deleteImage,
    uploadImage,
    getImageFile
};