'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JugadorPosicionSchema = new Schema({
    jugador: {type: mongoose.Schema.Types.ObjectId, ref: 'Jugador'},
    posicion: {type: mongoose.Schema.Types.ObjectId, ref: 'Posicion'},
    principal: Boolean
})

module.exports = mongoose.Model('Jugadorposicion',JugadorPosicionSchema);