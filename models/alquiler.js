'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AlquilerSchema = Schema({
    numero: String,
    tipo: String,
    cancha: {type: mongoose.Schema.Types.ObjectId, ref: 'Cancha'},
    tarifa: {type: mongoose.Schema.Types.ObjectId, ref: 'Tarifa'},
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    fechaAlquiler: Date,
    estado: {type:Boolean,default:true},
    subtotal: String,
    fecha: {type: Date,default: Date.now},
    una: {type:Boolean,default:true},
    dos: {type:Boolean,default:true},
    tres: {type:Boolean,default:true},
    cuatro: {type:Boolean,default:true},
    cinco: {type:Boolean,default:true},
    seis: {type:Boolean,default:true},
    siete: {type:Boolean,default:true},
    ocho: {type:Boolean,default:true},
    nueve: {type:Boolean,default:true},
    diez: {type:Boolean,default:true},
    oncee: {type:Boolean,default:true},
    doce: {type:Boolean,default:true},
    trece: {type:Boolean,default:true},
    catorce: {type:Boolean,default:true},
    quince: {type:Boolean,default:true},
    diezyseis: {type:Boolean,default:true},
    diezysiete: {type:Boolean,default:true},
    diezyocho: {type:Boolean,default:true},
    diezynueve: {type:Boolean,default:true},
    veinte: {type:Boolean,default:true},
    veinteyuno: {type:Boolean,default:true},
    veinteydos: {type:Boolean,default:true},
    veinteytres: {type:Boolean,default:true},
    cero: {type:Boolean,default:true}
})

module.exports = mongoose.model('Alquiler',AlquilerSchema);