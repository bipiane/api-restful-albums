'use strict';

const express = require('express');
const AlbumController = require('../controllers/album');
const api = express.Router();

api.get('/album/:id', AlbumController.getAlbum);
api.get('/albums', AlbumController.getAlbums);
api.post('/album', AlbumController.saveAlbum);
api.put('/album/:id', AlbumController.updateAlbum);
api.delete('/album/:id', AlbumController.deleteAlbum);

module.exports = api;