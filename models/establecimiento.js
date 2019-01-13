'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EstablecimientoSchema = new Schema({
    pais: String,
    provincia: String,
    canton: String,
    parroquia:String,
    direccion: {
        sector: String,
        callePrincipal: String,
        calleSecundaria: String
    },
    razonSocial: String,
    representante: String,
    correoRepresentante: String,
    telefonoRepresentante: String,
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
    creado:{type: Date,default: Date.now},
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
})

module.exports = mongoose.model('Establecimiento',EstablecimientoSchema);

