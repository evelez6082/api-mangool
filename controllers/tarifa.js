'use strict'
var Tarifa = require('../models/tarifa');
var Establecimiento = require('../models/establecimiento');

function guardarTarifa(req,res){
    var params = req.body;

    if(params.establecimiento && params.nombre && params.valor){
        var nuevaTarifa = {
            establecimiento: params.establecimiento,
            nombre: params.nombre.toUpperCase(),
            estado: params.estado,
            valor: params.valor,
            dia:{
                lunes: params.lunes,
                martes: params.martes,
                miercoles: params.miercoles,
                jueves: params.jueves,
                viernes: params.viernes,
                sabado: params.sabado,
                domingo: params.domingo
            },
            hora: {
                una: params.una,
                dos: params.dos,
                tres: params.tres,
                cuatro: params.cuatro,
                cinco: params.cinco,
                seis: params.seis,
                siete: params.siete,
                ocho: params.ocho,
                nueve: params.nueve,
                diez: params.diez,
                once: params.once,
                doce: params.doce,
                trece: params.trece,
                catorce: params.catorce,
                quince: params.quince,
                diezyseis: params.diezyseis,
                diezysiete: params.diezysiete,
                diezyocho: params.diezyocho,
                diezynueve: params.diezynueve,
                veinte: params.veinte,
                veinteyuno: params.veinteyuno,
                veinteydos: params.veinteydos,
                veinteytres: params.veinteytres,
                cero: params.cero
            }
        }
        Tarifa.find({nombre: params.nombre.toUpperCase(),establecimiento: params.establecimiento},(err,tarifa)=>{
            if(err) return res.status(500).send({message: 'Error en la petición de tarifa.'})
            if(tarifa && tarifa.length >= 1){
                return res.status(200).send({message: 'La tarifa que inteta registrar ya existe'})
            }else{
                Tarifa.create(nuevaTarifa,(err,tarifaGuardada)=>{
                    if(err) return res.status(500).send({message: 'Error al guardar tarifa.',error:err})
                    if(tarifaGuardada){
                        res.status(200).send({tarifaGuardada})
                    }else{
                        res.status(404).send({message: 'No se ha registrado la tarifa.'})
                    }
                })
            }
        })
    }else{
        return res.status(200).send({message: 'Por favor llene los campos obligatorios.'})
    }
}

function mostrarMisTarifas(req,res){
    var usuarioId = req.user.sub;
    Establecimiento.find({usuario:usuarioId},(err,establecimiento)=>{
        if(err) return res.status(500).send({message: 'Error en la petición de establecimiento.'})
        Tarifa.find({establecimiento:establecimiento[0]._id},(err,tarifas)=>{
            if(err) return res.status(500).send({message: 'Error en la petición de mis tarifas.'})
            if(!tarifas && tarifas.length <= 0 ) return res.status(200).send({message:'No existen tarifas registradas.'})
            return res.status(200).send({
                tarifas
            })
        })
    })
}

module.exports = {
    guardarTarifa,
    mostrarMisTarifas
}