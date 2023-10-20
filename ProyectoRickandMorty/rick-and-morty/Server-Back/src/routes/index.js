const login = require('../controllers/login');
const { deleteFav, postFav } = require('../controllers/handleFavorites');
const getCharById = require('../controllers/getCharById');
const express = require('express');
const Router = express.Router();

Router.get('/character/:id', getCharById);
Router.get('/login', login);
Router.post('/fav', postFav);
Router.delete('/fav/:id', deleteFav);

module.exports = Router;