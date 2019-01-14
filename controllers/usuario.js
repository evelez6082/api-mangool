'use strict'
var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../models/usuario');
var Persona = require('../models/persona');
var Establecimiento = require('../models/establecimiento');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

function home(req, res){
    res.status(200).send({
        message: 'Hola mundo'
    });
}

//registro
function saveUser(req,res){
    var usuario = new Usuario();
    var persona = new Persona();
    var params = req.body;

    if(params.nombres && params.apellidos && params.fechaNacimiento && params.sexo 
        && params.correo && params.contrasena){
            persona.nombre.nombres = params.nombres;
            persona.nombre.apellidos = params.apellidos;
            persona.fechaNacimiento = params.fechaNacimiento;
            persona.sexo = params.sexo;
            usuario.correo = params.correo.toLowerCase();
            usuario.rol = 'UsuarioJugador';
            usuario.imagen = null;

            //comprobar y controlar usuarios duplicados
            Usuario.find({ $or: [
                                    {correo: usuario.correo.toLowerCase()}
                                ]
                        }).exec((err,usuarios)=>{
                            if(err) return res.status(500).send({message: 'Error en la petición de usuarios'})
                            if(usuarios && usuarios.length >= 1){
                                return res.status(200).send({message: 'El usuario que intenta registrar ya existe'})
                            }else{
                                //Cifrar y guardar los datos
                                bcrypt.hash(params.contrasena,null,null,(err,hash)=>{

                                    usuario.contrasena = hash;
                                    persona.save((err,personaGuardada)=>{
                                        if(err) return res.status(500).send({error: err,message: 'Error al guardar usuario (persona)'});
                                        if(personaGuardada){
                                            usuario.persona = personaGuardada._id;
                                            //res.status(200).send({persona: personaGuardada})
                                            usuario.save((err,userStored)=>{
                                                if(err) return res.status(500).send({error: err,message: 'Error al guardar el usuario'});
                                                if(userStored){
                                                    res.status(200).send({usuario: userStored})
                                                }else{
                                                    res.status(404).send({message: 'No se ha registrado el usuario'});
                                                }
                                            })
                                        }else{
                                            res.status(404).send({message: 'No se ha registrado el usuario (persona)'});
                                        }
                                    })
                                })
                            }
                        })
    }else{
        res.status(200).send({
            message: 'Rellena o envia todos los campos necesarios'
        })
    }
}

//login
function loginUser(req, res){
    var params = req.body;
    var correo = params.correo;
    var contrasena = params.contrasena;

    Usuario.findOne({correo: correo}, (err,usuario)=>{
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(usuario){
            bcrypt.compare(contrasena,usuario.contrasena,(err, check)=>{
                if(check){
                    if(params.gettoken){
                        //generar y devolver el token
                        if (usuario.rol == 'UsuarioCancha') {
                            Establecimiento.find({usuario: usuario._id},(err,est)=>{
                                if(err) return res.status(500).send({message: 'Error en la petición'});
                                return res.status(200).send({token:jwt.createToken2(usuario,est)});
                            })
                        }else{
                            return res.status(200).send({token:jwt.createToken(usuario)});
                        }
                    }else{
                        //devolver datos del usuario sin cifrar en token
                        //devolver datos del usuario
                        usuario.contrasena = undefined;
                        if(usuario.rol == 'UsuarioCancha'){
                            Establecimiento.find({usuario: usuario._id},(err,establecimiento)=>{
                                if(err) return res.status(500).send({message: 'Error en la petición'});
                                return res.status(200).send({
                                    usuario: usuario,
                                    establecimiento: establecimiento})
                            })
                        }else{
                            return res.status(200).send({usuario})
                        }
                       

                    }
                }else{
                    return res.status(404).send({message: 'El usuario no se ha podido identificar'});
                }                
            })
        }else{
            return res.status(404).send({message: 'El usuario no se ha podido identificar, no existe'});
        }
    }).populate('persona');
}

// Conseguir datos de un usuario
function getUser(req,res){
	var usuarioId = req.params.id;
	Usuario.findById(usuarioId,(err,usuario)=>{
		if(err) return res.status(500).send({message: 'Error en la petición'});
		if(!usuario) return res.status(404).send({message: 'El ususario no existe'});

            usuario.contrasena = undefined;
			return res.status(200).send({
                usuario
			});
	});
}

//Devolver un listado de ussuarios paginados
function getUsers(req,res){
	var identity_user_id = req.user.sub;
	var page = 1;
	if(req.params.page){
		page = req.params.page;
	}
	var itemsPerPage = 5;
	Usuario.find().sort('_id').paginate(page,itemsPerPage,(err,usuarios,total)=>{
		if(err) return res.status(500).send({message: 'Error en la petición'});
		if(!usuarios) return res.status(404).send({message: 'No existen usuarios registrados'});

			return res.status(200).send({
				usuarios,
				total,
				page: Math.ceil(total/itemsPerPage)
			});

	});
}

//Actualizar o editar los datos de un usuario
function updateUser(req,res){
	var usuarioId = req.params.id;
	var update = req.body;
	//borrar la propiedad password
	delete update.password;
	if(usuarioId != req.user.sub){
		return res.status(500).send({message: 'No tienes permiso para actualizar los datos del usuario'});
	}
	Usuario.findByIdAndUpdate(usuarioId,update,{new:true},(err,userUpdate)=>{
		if(err) return res.status(500).send({message: 'Error en la petición'});
		if(!userUpdate) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
		return res.status(200).send({user: userUpdate});
	})
}


//Subir archivos de imagen/avatar de ususario

function uploadImage(req,res){
	var usuarioId = req.params.id;
	var image = req.params.image;
	if(usuarioId != req.user.sub){
		return removeFilesOfUploads(res,file_path,'No tienes permiso para actualizar los datos del usuario');
	}
	if(req.files){
		var file_path = req.files.image.path;
		var file_split= file_path.split('\\');
		var file_name = file_split[2];
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];
		if(file_ext == 'jpg' || file_ext == 'png' || file_ext == 'jpeg' || file_ext == 'gif'){
			//Actualizar documento de ususario logueado.
			Usuario.findByIdAndUpdate(usuarioId,{imagen:file_name},{new:true},(err,usuarioActualizado)=>{
				if(err) return res.status(500).send({message: 'Error en la petición'});
				if(!usuarioActualizado) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				return res.status(200).send({usuario: usuarioActualizado});
			})

		}else{
			return removeFilesOfUploads(res,file_path,'Extensión no válida');
		}
	}else{
		return res.status(200).send({message: 'No se han subido archivos o imagenes'});

	}
}

function removeFilesOfUploads(res,file_path,message){
	fs.unlink(file_path,(err)=>{
		return res.status(200).send({message: message});
	});
}

function getImageFile(req,res){
	var image_file = req.params.imageFile;
	var path_file = './uploads/usuarios/'+image_file;
	fs.exists(path_file,(exists)=>{
		if(exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen'});
		}
	});
}

function prueba(req,res){
    console.log(req.user.sub);
}

module.exports = {
    prueba,
    home,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    updateUser,
    uploadImage,
	getImageFile
}