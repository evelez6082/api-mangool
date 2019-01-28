'use strict'

var mangoose = require('mongoose');

var Schema = mongoose.Schema;

var DiaSchema = Schema({
    cancha: {type: mongoose.Schema.Types.ObjectId, ref: 'Cancha'},
    fecha:  {type: Date,default: Date.now},
    estado: {type: Boolean, default: true},
    hora: {
        una: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        dos: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        tres: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        cuatro: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        cinco: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        seis: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        siete: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        ocho: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        nueve: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        diez: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        once: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        doce: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        trece: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        catorce: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        quince: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        diezyseis: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        diezysiete: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        diezyocho: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        diezynueve: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        veinte: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        veinteyuno: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        veinteydos: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        veinteytres: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        },
        cero: {
            estado:{type: Boolean, default: true},
            alquilado:{type: Boolean, default: false},
            Alquilador:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
        }
    }
})

module.exports = mongoose.model('Dia', DiaSchema);