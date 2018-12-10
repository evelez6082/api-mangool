'use strict'

var express = require('express');
var PaisController = require('../controllers/otro');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/paises',PaisController.cargarPaises);
api.get('/provincias',PaisController.cargarProvincias);

module.exports = api;
