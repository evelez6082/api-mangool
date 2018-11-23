'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EquipoSchema = new Schema({
    nombre: String,
    logo: String,
    foto: String,
    descripcion: String,
    estado: Boolean,
    presidente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    calificacion:[
        {
            total: String,
            detalle: String,
            numeroDeEstrellas: Number,
            creado: {
                type: Date,
                default: Date.now
            }
        }
    ],
    fechaDeCreacion: {
        type: Date, 
        default: Date.now
    }
})

module.exports = mongoose.model('Equipo', EquipoSchema);


