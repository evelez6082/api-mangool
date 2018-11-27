'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProvinciaSchema = new Schema({
    nombre: String,
    capital: String,
    codigo: String,
    area: String,
    pais: {type: mongoose.Schema.Types.ObjectId ,ref: 'Pais'}
})

module.exports = mongoose.model('Provincia',ProvinciaSchema);