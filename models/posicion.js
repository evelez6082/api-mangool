'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PosicionSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: String
})

module.exports = mongoose.model('Posicion',PosicionSchema);
