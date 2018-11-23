'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JugadorSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    alias: String,
    dorsal: String,
    pieBueno: String,
    estado: Boolean,
    persona: {type: mongoose.Schema.Types.ObjectId, ref: 'Persona'}
})

module.exports = mongoose.Model('Jugador', JugadorSchema);