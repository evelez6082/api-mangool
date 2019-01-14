'use strict'

var jwt = require('jwt-simple');
var momment = require('moment');
var secret = "similaresoldofa";

exports.createToken = function(usuario){
    var payload = {
        sub: usuario._id,
        nombres: usuario.nombres,
        alias: usuario.alias,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        rol: usuario.rol,
        imagen: usuario.imagen,
        iat: momment().unix(),
        exp: momment().add(30,'days').unix()
    };

    return jwt.encode(payload,secret);
};

exports.createToken2 = function(usuario,est){
    var payload = {
        sub: usuario._id,
        establecimientoSub: est._id,
        nombres: usuario.nombres,
        alias: usuario.alias,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        rol: usuario.rol,
        imagen: usuario.imagen,
        iat: momment().unix(),
        exp: momment().add(30,'days').unix()
    };

    return jwt.encode(payload,secret);
};