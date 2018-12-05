'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EstablecimientoSchema = new Schema({
    razonSocial: String,
    representante: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    pais: {type: mongoose.Schema.Types.ObjectId, ref: 'Pais'},
    Provincia: {type: mongoose.Schema.Types.ObjectId, ref: 'Provincia'},
    direccion: {
        ciudad: String,
        sector: String,
        callePrincipal: String,
        calleSecundaria: String
    },
    logo: String,
    sitioWeb: String,
    redesSociales: 
        {
            facebook: String,
            instagram: String,
            twitter: String,
            youtube: String,
            snapchat: String
        },
    atencion: {inicio:String,cierre:String},
    creado:{type: Date,default: Date.now}
})

module.exports = mongoose.model('Establecimiento',EstablecimientoSchema);

