'use strict'
var bcrypt = require('bcrypt-nodejs');
var Establecimiento = require('../models/establecimiento');
var Pais = require('../models/pais');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

//Registrar establecimiento
function registrarEstablecimiento(req,res){
    var idusuario = req.user.sub;
    var establecimiento = new Establecimiento();
    var params = req.body;
    if(params.razonSocial && idusuario){
        establecimiento.razonSocial = params.razonSocial;
        establecimiento.propietario = idusuario;
        establecimiento.gerente = idusuario;
        establecimiento.pais = params.pais;
        establecimiento.provincia = params.provincia;
        establecimiento.direccion.ciudad = params.ciudad;
        establecimiento.direccion.sector = params.sector;
        establecimiento.direccion.callePrincipal = params.callePrincipal;
        establecimiento.direccion.calleSecundaria = params.calleSecundaria;
        establecimiento.logo = null;
        establecimiento.sitioWeb = params.sitioWeb;
        establecimiento.redesSociales.facebook = params.facebook;
        establecimiento.redesSociales.instagram = params.instagram;
        establecimiento.redesSociales.twitter = params.twitter;
        establecimiento.redesSociales.youtube = params.youtube;
        establecimiento.redesSociales.snapchat = params.snapchat;

        Establecimiento.find({razonSocial: params.razonSocial, propietario: req.user.sub}).exec((err,ests)=>{
            if(err) return res.status(500).send({message: 'Error en la petición de usuario',error:err});
            if(ests && ests.length >= 1){
                return res.status(200).send({message: '¡El establecimiento que intentas registrar, ya existe en tu lista de negocios!'});
            }else{
                establecimiento.save((err,estsGuardado)=>{
                    if (err) return res.status(500).send({message: 'Error al guardar del establecimiento.'}); 
                    if (estsGuardado) {
                        res.status(200).send({user: estsGuardado});
                    }else{
                        res.status(404).send({message: 'No se ha registrado el establecimiento.'});
                    }
                })
            }
        });

    }else{
        res.status(200).send({
            message: 'Enviar todos los campos necesarios!!'
        });
    }
}

//Mostrar el establecimiento
function mostrarEstablecimiento(req,res){
    var establecimientoId = req.params.id;

    /* Establecimiento.findById(establecimientoId,(err,establecimiento)=>{
        if(err) return res.status(500).send({error:err,message: 'Error en la petición.'});
        if(!establecimiento) return res.status(404).send({message: 'El establecimiento no existe.'});
        return res.status(200).send({
            establecimiento
        })
    }). */
    Establecimiento.findById(establecimientoId).
    populate('propietario').
    populate('gerente').
    populate('pais').
    populate('provincia').exec(function(err,establecimiento){
        if(err) return res.status(500).send({error:err,message: 'Error en la petición.'});
        if(!establecimiento) return res.status(404).send({message: 'El establecimiento no existe.'});
        return res.status(200).send({
            establecimiento
        })
    })
}

//Mostrar establecimientos
function mostrarEstablecimientos(req, res){
    var pagina = 1;
    if(req.params.pagina){
        pagina = req.params.pagina;
    }
    var itemsPerPage = 5;
    Establecimiento.find().sort('_id').paginate(pagina,itemsPerPage,(err,establecimientos,total)=>{
        if(err) return res.status(500).send({error: err,message: 'Error en la petición.'});
        if(!establecimientos) return res.status(404).send({message: 'No existen establecimientos registrados.'});
        return res.status(200).send({
            establecimientos,
            total,
            page: Math.ceil(total/itemsPerPage)
        })
    });
} 

function mostrarMisEstablecimientos(req, res){
    var usuarioId = req.user.sub;
    var pagina = 1;
    if(req.params.pagina){
        pagina = req.params.pagina;
    }
    var itemsPerPage = 5;
    Establecimiento.find({propietario: usuarioId}).
    sort('_id').paginate(pagina,itemsPerPage,(err,establecimientos,total)=>{
        if(err) return res.status(500).send({error: err,message: 'Error en la petición.'});
        if(!establecimientos) return res.status(404).send({message: 'No existen establecimientos registrados.'});
        return res.status(200).send({
            establecimientos,
            total,
            page: Math.ceil(total/itemsPerPage)
        })
    });
} 

module.exports = {
    registrarEstablecimiento,
    mostrarEstablecimiento,
    mostrarEstablecimientos,
    mostrarMisEstablecimientos
}
