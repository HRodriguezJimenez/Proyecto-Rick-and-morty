const express = require('express');
const Router = express.Router();
const postUser = require('../controllers/postUser');
const getCharById = require('../controllers/getCharById');
const randomCharacter = require('../controllers/randomCharacter');
const login = require('../controllers/login');
const postFav  = require('../controllers/postFav');
const deleteFav = require('../controllers/deleteFav')


Router.get('/character/:id', getCharById);
Router.get('/randomCharacter', randomCharacter);
Router.post('/login', postUser);
Router.get('/login', login)
Router.post('/fav', postFav);
Router.delete('/fav/:id', deleteFav);


module.exports = Router;