var mongoose = require('mongoose');
var User = mongoose.model('User');
var service = require('./service');

exports.emailSignup = function(req, res) {
	var user = new User({
    	// Creamos el usuario con los campos
        // que definamos en el Schema
        // nombre, email, etc...
    });
    
    user.save(function(err){
    	return res
    		.status(200)
        	.send({token: service.createToken(user)});
    });
};

exports.emailLogin = function(req, res) {
	User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
    	// Comprobar si hay errores
        // Si el usuario existe o no
        // Y si la contraseña es correcta
        return res
        	.status(200)
            .send({token: service.createToken(user)});
    });
};