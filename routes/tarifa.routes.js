'use strict'

var express = require('express');
var TarifaController = require('../controllers/tarifa');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/registrar-tarifa',md_auth.ensureAuth,TarifaController.guardarTarifa);
api.get('/mis-tarifas/:page?',md_auth.ensureAuth,TarifaController.mostrarMisTarifas);
// api.get('/tarifa/:id',md_auth.ensureAuth,TarifaController.mostrarCancha);
// api.get('/tarifas/:page?',md_auth.ensureAuth,TarifaController.mostrarCanchas);
// api.put('/actualizar-tarifa/:id',md_auth.ensureAuth,TarifaController.actualizarCancha);

module.exports = api;