'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HoraSchema = new Schema({
    nombre: String,
    estado: {type: Boolean, default: true},
    creado: {type: Date,default: Date.now},
});

module.exports = mongoose.model('Hora',HoraSchema);