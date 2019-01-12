'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TarifaSchema = Schema({
    establecimiento: {type: mongoose.Schema.Types.ObjectId, ref: 'Establecimiento'},
    nombre: String,
    estado: {type: Boolean, default: true},
    valor: String,
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
        una: Boolean,
        dos: Boolean,
        tres: Boolean,
        cuatro: Boolean,
        cinco: Boolean,
        seis: Boolean,
        siete: Boolean,
        ocho: Boolean,
        nueve: Boolean,
        diez: Boolean,
        once: Boolean,
        doce: Boolean,
        trece: Boolean,
        catorce: Boolean,
        quince: Boolean,
        diezyseis: Boolean,
        diezysiete: Boolean,
        diezyocho: Boolean,
        diezynueve: Boolean,
        veinte: Boolean,
        veinteyuno: Boolean,
        veinteydos: Boolean,
        veinteytres: Boolean,
        cero: Boolean
    }
})

module.exports = mongoose.model('Tarifa', TarifaSchema);