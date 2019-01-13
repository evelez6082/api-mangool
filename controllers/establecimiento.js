'use strict'
var bcrypt = require('bcrypt-nodejs');
var Establecimiento = require('../models/establecimiento');
var Usuario = require('../models/usuario');
var Pais = require('../models/pais');
var Provincia = require('../models/provincia');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

//Registrar establecimiento
function registrarEstablecimiento(req,res){
    var establecimiento = new Establecimiento();
    var params = req.body;
    if(params.razonSocial && params.usuario && params.contrasena){
        // establecimiento.pais = params.pais;
        establecimiento.provincia = params.provincia;
        establecimiento.canton = params.canton;
        establecimiento.parroquia = params.parroquia;
        establecimiento.direccion.sector = params.sector;
        establecimiento.direccion.callePrincipal = params.callePrincipal;
        establecimiento.direccion.calleSecundaria = params.calleSecundaria;
        establecimiento.razonSocial = params.razonSocial;
        establecimiento.representante = params.nombreRepresentante;
        establecimiento.correoRepresentante = params.correoRepresentante;
        establecimiento.telefonoRepresentante = params.telefonoRepresentante;
        establecimiento.logo = null;
        // establecimiento.sitioWeb = params.sitioWeb;
        // establecimiento.redesSociales.facebook = params.facebook;
        // establecimiento.redesSociales.instagram = params.instagram;
        // establecimiento.redesSociales.twitter = params.twitter;
        // establecimiento.redesSociales.youtube = params.youtube;
        // establecimiento.redesSociales.snapchat = params.snapchat;
        // establecimiento.atencion.inicio = params.inicio;
        // establecimiento.atencion.cierre = params.cierre;
        Usuario.find({correo: params.usuario}).exec((err,usuario)=>{
            if(err) return res.status(500).send({message: 'Error en la petición de usuario',error:err});
            if(usuario && usuario.length >= 1){
                return res.status(200).send({message: 'El correo ingresado ya existe registrado en el sistema.'});
            }else{
                Establecimiento.find({razonSocial: params.razonSocial}).exec((err,ests)=>{
                    if(err) return res.status(500).send({message: 'Error en la petición de establecimiento',error:err});
                    if(ests && ests.length >= 1){
                        return res.status(200).send({message: 'La razón social ingresada ya existe. Por favor ingrese otra.'});
                    }else{
                        usuario = new Usuario();
                        usuario.correo = params.usuario;
                        usuario.rol = 'UsuarioCancha';
                        usuario.imagen = null;
                        //Cifrar y guardar los datos
                        bcrypt.hash(params.contrasena,null,null,(err,hash)=>{
                            usuario.contrasena = hash;
                            usuario.save((err,userStored)=>{
                                if(err) return res.status(500).send({error: err,message: 'Error al guardar el usuario'});
                                if(userStored){
                                    establecimiento.usuario = userStored._id;
                                    establecimiento.save((err,estsGuardado)=>{
                                        if (err) return res.status(500).send({error: err,message: 'Error al guardar establecimiento.'}); 
                                        if (estsGuardado) {
                                            res.status(200).send({establecimiento: estsGuardado});
                                        }else{
                                            res.status(404).send({message: 'No se ha registrado el establecimiento.'});
                                        }
                                    })
                                }else{
                                    res.status(404).send({message: 'No se ha registrado el usuario'});
                                }
                            })
                        })

                    }
                });
            }
        })



    }else{
        res.status(200).send({
            message: 'Enviar todos los campos necesarios!!'
        });
    }
}

//Actualizar o editar los datos del establecimiento
function actualizarEstablecimiento(req,res){
    var usuarioId = req.user.sub;
	var establecimientoId = req.params.id;
    var params = req.body;
    var establecimiento = new Establecimiento();
	//borrar la propiedad password
    //delete update.password;
    Establecimiento.find({_id:establecimientoId,usuario:usuarioId}).exec((err,estab)=>{
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!estab || estab.length <= 0) return res.status(403).send({message: 'No tienes permiso para actualizar los datos de esta cuenta.'});
        //return res.status(200).send({establecimiento: establecimiento});
        var update = {
            razonSocial: params.razonSocial,
            representante: params.representante,
            //pais: params.pais,
            //provincia: params.provincia,
            direccion: {
                ciudad: params.ciudad,
                sector: params.sector,
                callePrincipal: params.callePrincipal,
                calleSecundaria: params.calleSecundaria
            },
            logo: params.logo,
            sitioWeb: params.sitioWeb,
            redesSociales: 
                {
                    facebook: params.facebook,
                    instagram: params.instagram,
                    twitter: params.twitter,
                    youtube: params.youtube,
                    snapchat: params.snapchat
                },
            atencion: {inicio:params.inicio,cierre:params.cierre}
        };
        Establecimiento.findByIdAndUpdate(establecimientoId,{$set:update},{new: true},(err,establecimientoActualizado)=>{
            if(err) return res.status(500).send({error: err,message: 'Error en la petición al actualizar establecimiento'});
            if(!establecimientoActualizado) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
            return res.status(200).send({establecimientoActualizado: establecimientoActualizado});
        });
    });
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
    populate('representante').
    populate('usuario').
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
    mostrarMisEstablecimientos,
    actualizarEstablecimiento
}
