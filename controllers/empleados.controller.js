const usuario = require('../models/empleados');

const empleadosctrl={};

empleadosctrl.ObtenerEmpleados = async(req,res)=>
{
   const usuarios = await usuario.find()
    res.json(usuarios);
}

empleadosctrl.AgregarEmpleados = async (req, res) =>{
    const addUsuario = new usuario({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        email: req.body.email,
        contrasena: req.body.contrasena,
        fNacimiento: req.body.fNacimiento,
        genero: req.body.genero

    });   
    await addUsuario.save();
    res.json({estado:'Usuario Guardado'});
};

empleadosctrl.ObtenerEmpleado = async (req, res) =>{

  const Ousuario = await usuario.findById(req.params.id);
    res.json(Ousuario);
};

empleadosctrl.EditarEmpleado = async (req, res) =>{
    const EditUsuario = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        email: req.body.email,
        contrasena: req.body.contrasena,
        fNacimiento: req.body.fNacimiento,
        genero: req.body.genero
    }
   await usuario.findByIdAndUpdate(req.params.id, {$set: EditUsuario}, {new: true});
    res.json({estado: 'Usuario Actualizado'});
};

empleadosctrl.BorrarEmpleado = async (req, res) =>{
await usuario.findByIdAndRemove(req.params.id);
res.json({estado: 'Usuario Eliminado'});
}




module.exports = empleadosctrl;