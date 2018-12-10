'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EstablecimientoSchema = new Schema({
    razonSocial: String,
    //representante: {type: mongoose.Schema.Types.ObjectId, ref: 'Persona'},
    representante: String,
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
<<<<<<< HEAD
    pais: String,
    provincia: String,
    canton: String,
=======
    pais: {type: String, default: 'Ecuador'},
    provincia: {type: String, default: 'Manabí'},
    ciudad: String,
>>>>>>> e14acb504a3091e989d21e2ed57b968a29917c97
    direccion: {
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

