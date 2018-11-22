'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombres: String,
    apellidos: String,
    alias: String,
    correo: String,
    contrasena: String,
    rol: String,
    imagen: String
})

module.exports = mongoose.model('Usuario',UsuarioSchema);