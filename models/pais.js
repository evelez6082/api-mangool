'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PaisSchema = new Schema({
    Code: String,
    Name: String,
    Native: String,
    Phone: Number,
    Continent: String,
    Capital: String,
    Currency: String,
    Languages: String
})

module.exports = mongoose.model('Pais', PaisSchema);