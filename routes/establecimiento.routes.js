'use strict'

var express = require('express');
var EstablecimientoController = require('../controllers/establecimiento');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/establecimiento/:id',EstablecimientoController.mostrarEstablecimiento);
api.get('/establecimientos/:pagina?',EstablecimientoController.mostrarEstablecimientos);
api.get('/mis-establecimientos/:pagina?',md_auth.ensureAuth,EstablecimientoController.mostrarMisEstablecimientos);
api.post('/registrar-establecimiento/',md_auth.ensureAuth,EstablecimientoController.registrarEstablecimiento);


module.exports = api;
