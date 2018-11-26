'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CanchaSchema = new Schema({
    nombre: String,
    dimensiones: {largo: Number, ancho: Number},
    cesped: String,
    numeroJugadores: Number,
    estado: Boolean,
    creado:{type: Date,default: Date.now},
    establecimiento: {type: mongoose.Schema.Types.ObjectId, ref: 'Establecimiento'},
    tarifaDefault: {
        diaSemana:{dia: String, noche: String},
        finSemana:{dia: String, noche: String}
    }
});

module.exports = mongoose.model('Cancha',CanchaSchema);