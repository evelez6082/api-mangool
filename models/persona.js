'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PersonaSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cedula: String,
    nombre: {
        nombres: String,
        apellidos: String
    },
    fechaNacimiento: Date,
    Nacionalidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nacionalidad'
    },
    sexo: String,
    edad: Number,
    telefono: String,
    pais: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pais'
    },
    Ciudad: String,
    Direccion: String
})

module.exports = mongoose.model('Persona',PersonaSchema);