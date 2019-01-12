'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AlquilerSchema = Schema({
    numero: String,
    tipo: String,
    persona: {type: mongoose.Schema.Types.ObjectId, ref: 'persona'},
    fecha: {type: Date,default: Date.now},
    estado: {type:Boolean,defaut:true},
    subtotal: String,
    alquilerDetalle:{
        fechaJuego: Date,
        numHoras: String,
        tarifa: {type: mongoose.Schema.Types.ObjectId, ref: 'tarifa'},
    }    
})

module.exports = mongoose.model('Alquiler',AlquilerSchema);