'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AlquilerSchema = Schema({
    numero: String,
    tipo: String,
    cancha: {type: mongoose.Schema.Types.ObjectId, ref: 'Cancha'},
    tarifa: {type: mongoose.Schema.Types.ObjectId, ref: 'Tarifa'},
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    fecha: {type: Date,default: Date.now},
    fechaAlquiler: Date,
    estado: {type:Boolean,default:true},
    subtotal: String,
    horas:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'hora'}
        // {una: {type:Boolean,default:false}},
        // {dos: {type:Boolean,default:false}},
        // {tres: {type:Boolean,default:false}},
        // {cuatro: {type:Boolean,default:false}},
        // {cinco: {type:Boolean,default:false}},
        // {seis: {type:Boolean,default:false}},
        // {siete: {type:Boolean,default:false}},
        // {ocho: {type:Boolean,default:false}},
        // {nueve: {type:Boolean,default:false}},
        // {diez: {type:Boolean,default:false}},
        // {oncee: {type:Boolean,default:false}},
        // {doce: {type:Boolean,default:false}},
        // {trece: {type:Boolean,default:false}},
        // {catorce: {type:Boolean,default:false}},
        // {quince: {type:Boolean,default:false}},
        // {diezyseis: {type:Boolean,default:false}},
        // {diezysiete: {type:Boolean,default:false}},
        // {diezyocho: {type:Boolean,default:false}},
        // {diezynueve: {type:Boolean,default:false}},
        // {veinte: {type:Boolean,default:false}},
        // {veinteyuno: {type:Boolean,default:false}},
        // {veinteydos: {type:Boolean,default:false}},
        // {veinteytres: {type:Boolean,default:false}},
        // {cero: {type:Boolean,default:false}}
    ]
})

module.exports = mongoose.model('Alquilere',AlquilerSchema);