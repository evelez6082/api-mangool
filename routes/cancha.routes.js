'use strict'

var express = require('express');
var CanchaController = require('../controllers/cancha');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/registrar-cancha',md_auth.ensureAuth,CanchaController.guardarCancha);
api.get('/cancha/:id',md_auth.ensureAuth,CanchaController.mostrarCancha);
api.get('/canchas',CanchaController.mostrarCanchas);
api.post('/canchas/:page?',CanchaController.mostrarCanchas);
api.get('/mis-canchas/:page?',md_auth.ensureAuth,CanchaController.mostrarMisCanchas);
api.put('/actualizar-cancha/:id',md_auth.ensureAuth,CanchaController.actualizarCancha);
//api.post('/subir-imagen-cancha/:id',[md_auth.ensureAuth,md_upload],CanchaController.uploadImage);
//api.get('/obtener-imagen-cancha/:imageFile',CanchaController.getImageFile);

module.exports = api;