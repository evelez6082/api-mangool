const mongoose = require('mongoose');

const {Schema} = mongoose;


const EsquemaUsuarios = new Schema({
    
    nombres:{type: String, required: true},
    apellidos:{type: String, required: true},
    email:{type: String, required: true},    
    contrasena:{type: String, required: true},
    fNacimiento: {type: Date, required: true},
    genero: {type: String, required: true}
});

module.exports = mongoose.model('Usuarios', EsquemaUsuarios);
