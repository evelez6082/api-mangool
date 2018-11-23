'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    persona: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona'
    },
    correo: String,
    contrasena: String,
    observacion: String,
    rol: {
        type: String,
        default: 'UsuarioJugador'
    },
    imagen: String,
    estado: Boolean
})

module.exports = mongoose.model('Usuario',UsuarioSchema);