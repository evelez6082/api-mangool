'use strict'
var Cancha = require('../models/cancha');
var mongoosePaginate = require('mongoose-pagination');

function guardarCancha(req,res){
    var cancha = new Cancha();
    var params = req.body;

    if(params.nombre && params.largo && params.ancho && params.cesped && params.numeroJugadores && params.establecimiento){
        cancha.nombre = params.nombre.toUpperCase();
        cancha.dimensiones.largo = params.largo;
        cancha.dimensiones.ancho = params.ancho;
        cancha.cesped = params.cesped;
        cancha.numeroJugadores = params.numeroJugadores;
        cancha.estado = params.estado;
        cancha.establecimiento = params.establecimiento;
        cancha.tarifaDefault.diaSemana.dia = params.diaDiaSemana;
        cancha.tarifaDefault.diaSemana.noche = params.nocheDiaSemana;
        cancha.tarifaDefault.finSemana.dia = params.diaFinSemana;
        cancha.tarifaDefault.finSemana.noche = params.nocheFinSemana;
        Cancha.find({nombre: cancha.nombre.toUpperCase(),establecimiento: cancha.establecimiento}).exec((err,canchas)=>{
            if(err) return res.status(500).send({message: 'Error en la petición de cancha.'})
            if(canchas && canchas.length >= 1 ){
                return res.status(200).send({message: 'La cancha que intenta registrar ya existe.'})
            }else{
                cancha.save((err,canchaGuardada)=>{
                    if(err) return res.status(500).send({message: 'Error al guardar cancha.',error:err})
                    if(canchaGuardada){
                        res.status(200).send({canchaGuardada})
                    }else{
                        res.status(404).send({message: 'No se ha registrado la cancha.'})
                    }
                })
            }
        })
    }else{
        res.status(200).send({message: 'Rellena o envia todos los campos necesarios.'})
    }
}

function mostrarCancha(req,res){
    var canchaId = req.params.id;
    Cancha.findById(canchaId,(err,cancha)=>{
        if(err) return res.status(500).send({message: 'Error en la petición.', error: err})
        if(!cancha) return res.status(200).send({message: 'La cancha no existe.'})
        return res.status(200).send({
            cancha
        })
    })
}

function mostrarCanchas(req,res){
    var usuarioId = req.user.sub;
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }
    var itemsPerPage = 5;
    Cancha.find().
    populate({
        path: 'establecimiento',
        match: {
            propietario: usuarioId 
        }
    }).
    exec(function (err,canchas){
        if(err) return handleError(err);
        return res.status(200).send({canchas: canchas})
    })
    /*Cancha.find().sort('_id').paginate(page,itemsPerPage,(err,canchas,total)=>{
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!canchas) return res.status(404).send({message: 'No existen canchas registradas'});
        return res.status(200).send({
            canchas,
            total,
            page: Math.ceil(total/itemsPerPage)
        })
    })*/
}

async function establecimientoCancha(establecimientoId){
    
}

module.exports = {
    guardarCancha,
    mostrarCancha,
    mostrarCanchas
}