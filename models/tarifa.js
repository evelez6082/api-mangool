'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TarifaSchema = new Schema({
    cancha: {Type: mongoose.Schema.Types.ObjectId, ref: 'Cancha'},
    nombre: String,
    estado: Boolean,
    dia:{
        lunes: Boolean,
        martes: Boolean,
        miercoles: Boolean,
        jueves: Boolean,
        viernes: Boolean,
        sabado: Boolean,
        domingo: Boolean
    },
    hora: {
        "01H00": Boolean,
        "02H00": Boolean,
        "03H00": Boolean,
        "03H00": Boolean,
        "04H00": Boolean,
        "05H00": Boolean,
        "06H00": Boolean,
        "07H00": Boolean,
        "08H00": Boolean,
        "09H00": Boolean,
        "10H00": Boolean,
        "11H00": Boolean,
        "12H00": Boolean,
        "13H00": Boolean,
        "14H00": Boolean,
        "15H00": Boolean,
        "16H00": Boolean,
        "17H00": Boolean,
        "18H00": Boolean,
        "19H00": Boolean,
        "20H00": Boolean,
        "21H00": Boolean,
        "22H00": Boolean,
        "23H00": Boolean,
        "00H00": Boolean
    }
});

module.exports = mongoose.Model('Tarifa', TarifaSchema);