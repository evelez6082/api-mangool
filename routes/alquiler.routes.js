'use strict'

var express = require('express');
var AlquilerController = require('../controllers/alquiler');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/registrar-alquiler',md_auth.ensureAuth,AlquilerController.registrarAlquiler);
// api.get('/cancha/:id',md_auth.ensureAuth,AlquilerController.mostrarCancha);
// api.get('/canchas/:establecimiento',AlquilerController.mostrarCanchasByEstablecimiento);
// api.get('/canchas',AlquilerController.mostrarCanchas);
// api.post('/canchas/:page?',AlquilerController.mostrarCanchas);
// api.get('/mis-canchas/:page?',md_auth.ensureAuth,AlquilerController.mostrarMisCanchas);
// api.put('/actualizar-cancha/:id',md_auth.ensureAuth,AlquilerController.actualizarCancha);

module.exports = api;