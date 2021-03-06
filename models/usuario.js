'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
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
    estado: {type: Boolean, default: true}
})

module.exports = mongoose.model('Usuario',UsuarioSchema);