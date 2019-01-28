'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = Schema({
    cancha: {type: mongoose.Schema.Types.ObjectId, ref: 'Cancha'},
    tarifa: {type: mongoose.Schema.Types.ObjectId, ref: 'Tarifa'},
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    fecha:  {type: Date,default: Date.now},
    estado: {type: Boolean, default: true},
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

module.exports = mongoose.model('Item',ItemSchema);