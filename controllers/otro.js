'use strict'
var bcrypt = require('bcrypt-nodejs');
var Pais = require('../models/pais');
var Provincias = require('../models/provincia');

function cargarPaises(req,res){
    Pais.find({}).exec((err,paises)=>{
        if(err) return res.status(500).send({error: err, message: 'Error en la petición de cargar País.'})
        if(!paises && paises.length <= 0) return res.status(200).send({estado: false, message: 'Sin datos.' })
        return res.status(200).send({
            // idPais: paises['_id'],
            // nombre: paises['Name']
            paises
        });
    })
}

function cargarProvincias(req,res){
    Provincias.find({}).exec((err,provincias)=>{
        if(err) return res.status(500).send({error: err, message: 'Error en la petición de cargar Provincias.'})
        if(!provincias && provincias.length <= 0) return res.status(200).send({estado: false, message: 'Sin datos.' })
        return res.status(200).send({
            provincias
        });
    })
}

module.exports = {
    cargarPaises,
    cargarProvincias
}

