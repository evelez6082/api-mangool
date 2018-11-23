'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EstablecimientoSchema = new Schema({
    razonComercial: String,
    propietario: {},
    gerente: {},
    pais: {},
    Provincia: {},
    direccion: {
        ciudad: String,
        callePrincipal: String,
        calleSecundaria: String
    },
    logo: String,
    sitioWeb: String,
    redesSociales: [
        {
            facebook: String,
            instagram: String,
            twitter: String,
            youtube: String,
            snapchat: String
        }
    ],
    creado:{type: Date,default: Date.now},
    horariosAtencion: []
});

module.exports = mongoose.Model('Establecimiento', EstablecimientoSchema);