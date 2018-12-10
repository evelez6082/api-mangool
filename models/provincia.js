'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProvinciaSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    provincia: String,
    cantones: {},   
})

module.exports = mongoose.model('Provincia',ProvinciaSchema);