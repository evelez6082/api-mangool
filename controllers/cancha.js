'use strict'
var Cancha = require('../models/cancha');
var Establecimiento = require('../models/establecimiento');
var mongoosePaginate = require('mongoose-pagination');
var moment = require('moment');

function guardarCancha(req,res){

    res.status(202).send({message: moment().day(10)});
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
        cancha.misTarifas = params.misTarifas;
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

function actualizarCancha(req,res){
    var canchaId = req.params.id;
    var usuarioId = req.user.sub;
    var params = req.body;
    var cancha = new Cancha();

    Establecimiento.find({usuario:usuarioId},(err,establecimiento)=>{
        if(err) return handleError(err);
        if(establecimiento){
            Cancha.find({_id:canchaId,establecimiento:establecimiento[0]._id},(err,cancha)=>{
                if(err) return res.status(500).send({message: 'Error en la petición.', error: err})
                if(!cancha || cancha.length <= 0) return res.status(200).send({message: 'La cancha no existe.'})
                var update = {
                    nombre: params.nombre,
                    dimensiones: {
                        largo: params.largo, 
                        ancho: params.ancho
                    },
                    cesped: params.cesped,
                    numeroJugadores: params.numeroJugadores,
                    estado: params.estado,
                    establecimiento: params.establecimiento,
                    tarifaDefault: {
                        diaSemana:{
                            dia: params.diaDiaSemana, 
                            noche: params.nocheDiaSemana
                        },
                        finSemana:{
                            dia: params.diaFinSemana, 
                            noche: params.nocheFinSemana
                        }
                    }
                };
                Cancha.findByIdAndUpdate(canchaId,{$set:update},{new:true},(err,canchaActualizada)=>{
                    if(err) return res.status(500).send({error: err,message: 'Error en la petición al actualizar cancha'});
                    if(!canchaActualizada) return res.status(404).send({message: 'No se ha podido actualizar la cancha'});
                    return res.status(200).send({canchaActualizada});
                });
            })
        }else{
            return res.status(404).send({message: 'No existen datos (establecimiento)'})
        }
    });
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
    var page = 1;
    if(req.body.draw){
      page = req.body.draw;
    }
    var itemsPerPage = 10;
    Cancha.find().sort('_id').
    populate({
        path: 'establecimiento'
    }).
    paginate(page,itemsPerPage,(err,canchas,total)=>{
        if(err) return handleError(err);
        if(!canchas) return res.status(404).send({message: 'No existen canchas registradas'});
        return res.status(200).send({
            canchas,
            total,
            pages: Math.ceil(total/itemsPerPage)
        })
    })
}

function mostrarMisCanchas(req,res){
    var usuarioId = req.user.sub;
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }
    var itemsPerPage = 5;
    Establecimiento.find({usuario: usuarioId},(err,establecimiento)=>{
        if(err) return res.status(500).send({message: 'Error en la petición establecimiento'});
        if(!establecimiento || establecimiento.length <= 0) return res.status(200).send({message: 'no existe registro'});
        Cancha.find({establecimiento: establecimiento[0]._id},(err,canchas)=>{
            if(err) return res.status(500).send({message: 'Error en la petición'});
            if(!canchas || canchas.length <= 0) return res.status(404).send({message: 'No existen canchas registradas'});
            return res.status(200).send({canchas: canchas})
        })
    })
}

function mostrarCanchasByEstablecimiento(req,res){
    var establecimientoId = req.params.establecimiento;
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }
    var itemsPerPage = 5;
    Cancha.find({establecimiento:establecimientoId}).sort('_id').paginate(page,itemsPerPage,(err,canchas,total)=>{
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!canchas) return res.status(404).send({message: 'No existen canchas registradas'});
        return res.status(200).send({
            canchas,
            total,
            page: Math.ceil(total/itemsPerPage)
        })
    })
}

module.exports = {
    guardarCancha,
    mostrarCancha,
    mostrarCanchas,
    actualizarCancha,
    mostrarMisCanchas,
    mostrarCanchasByEstablecimiento
}