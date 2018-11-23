'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlantillaSchema = Schema({
	jugador: { type: Schema.ObjectId, ref: 'Jugador'},
    equipo: { type: Schema.ObjectId, ref: 'Equipo'},
    fecha: Date,
    rol: {
        cargo: String,
        posicion: { type: Schema.ObjectId, ref: 'Posicion'}
    }
});

module.exports = mongoose.model('Plantilla', PlantillaSchema);
