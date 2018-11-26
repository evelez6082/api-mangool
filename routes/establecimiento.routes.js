'use strict'

var express = require('express');
var EstablecimientoController = require('../controllers/establecimiento.controller');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/establecimientos/:pagina?',EstablecimientoController.mostrarEstablecimientos);
api.get('/establecimiento/:id',md_auth.ensureAuth,EstablecimientoController.mostrar);
api.post('/registrar-establecimiento/',md_auth.ensureAuth,EstablecimientoController.registrarEstablecimiento);


module.exports = api;
