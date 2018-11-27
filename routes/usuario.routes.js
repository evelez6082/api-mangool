'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/usuarios'});

api.get('/home',md_auth.ensureAuth,UsuarioController.home);
api.get('/prueba',md_auth.ensureAuth,UsuarioController.prueba);
api.post('/register',UsuarioController.saveUser);
api.post('/login',UsuarioController.loginUser);
api.get('/user/:id',md_auth.ensureAuth,UsuarioController.getUser);
api.get('/users/:page?',md_auth.ensureAuth,UsuarioController.getUsers);
api.put('/update-user/:id',md_auth.ensureAuth,UsuarioController.updateUser);
api.post('/upload-imagen-user/:id',[md_auth.ensureAuth,md_upload],UsuarioController.uploadImage);
api.get('/get-image-user/:imageFile',UsuarioController.getImageFile);


module.exports = api;