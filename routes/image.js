'use strict';

const express = require('express');
const ImageController = require('../controllers/image');
const api = express.Router();

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './uploads'});

api.get('/prueba-image', ImageController.pruebas);
api.get('/image/:id', ImageController.getImage);
api.get('/images/:album?', ImageController.getImages);
api.post('/image', ImageController.saveImage);
api.put('/image/:id', ImageController.updateImage);
api.delete('/image/:id', ImageController.deleteImage);
api.post('/upload-image/:id', multipartMiddleware, ImageController.uploadImage);
api.get('/get-image/:imageFile', multipartMiddleware, ImageController.getImageFile);

module.exports = api;