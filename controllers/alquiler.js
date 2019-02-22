'use strict'
var Alquiler = require('../models/alquiler');

function registrarAlquiler(req,res) {
    var alquiler = new Alquiler();
    var params = req.body;
    if(params.numero && params.tipo && params.cliente && params.cancha && params.fechaAlquiler){
        alquiler.numero = params.numero;
        alquiler.tipo = params.tipo;
        alquiler.cancha = params.cancha;
        alquiler.tarifa = params.tarifa;
        alquiler.cliente = params.cliente;
        alquiler.fechaAlquiler = params.fechaAlquiler;
        alquiler.horas = params.horas;
        // alquiler.una = params.una;
        // alquiler.dos = params.dos;
        // alquiler.tres = params.tres;
        // alquiler.cuatro = params.cuatro;
        // alquiler.cinco = params.cinco;
        // alquiler.seis = params.seis;
        // alquiler.siete = params.siete;
        // alquiler.ocho = params.ocho;
        // alquiler.nueve = params.nueve;
        // alquiler.diez = params.diez;
        // alquiler.oncee = params.once;
        // alquiler.doce = params.doce;
        // alquiler.trece = params.trece;
        // alquiler.catorce = params.catorce;
        // alquiler.quince = params.quince;
        // alquiler.diezyseis = params.diezyseis;
        // alquiler.diezysiete = params.diezysiete;
        // alquiler.diezyocho = params.diezyocho;
        // alquiler.diezynueve = params.diezynueve;
        // alquiler.veinte = params.veinte;
        // alquiler.veinteyuno = params.veinteyuno;
        // alquiler.veinteydos = params.veinteydos;
        // alquiler.veinteytres = params.veinteytres;
        // alquiler.cero = params.cero;
        Alquiler.find({cancha: params.cancha, fechaAlquiler: params.fechaAlquiler, horas: { $in: params.horas}},(err,alquileres)=>{
            if(err) return res.status(500).send({message: 'Error en la petición de usuario',error:err});
            if(alquileres && alquileres.length >= 1){
                return res.status(200).send({message: 'Horario ocupado, no se registro el alquiler.'});
            }else{
                //res.status(200).send({message: "Registro de alquiler exitosamente"});
                alquiler.save((err,alquilerRegistrado)=>{
                    if (err) return res.status(500).send({message: 'Error al guardar el alquiler',error:err}); 
                    if (alquilerRegistrado) {
                        res.status(200).send({alquiler: alquilerRegistrado});
                    }else{
                        res.status(404).send({message: 'No se ha registrado el alquiler'});
                    }
                })            
            }
        })
        // Alquiler.find({$and:[
        //     {una:params.una},
        //     {dos:params.dos},
        //     {tres:params.tres},
        //     {cuatro:params.cuatro},
        //     {quinco:params.quinco},
        //     {seis:params.seis},
        //     {siete:params.siete},
        //     {ocho:params.ocho},
        //     {nueve:params.nueve},
        //     {diez:params.diez},
        //     {oncee:params.once},
        //     {doce:params.doce},
        //     {trece:params.trece},
        //     {catorce:params.catorce},
        //     {quince:params.quince},
        //     {diezyseis:params.diezyseis},
        //     {diezysiete:params.diezysiete},
        //     {diezyocho:params.diezyocho},
        //     {diezynueve:params.diezynueve},
        //     {veinte:params.veinte},
        //     {veinteyuno:params.veinteyuno},
        //     {veinteydos:params.veinteydos},
        //     {veinteytres:params.veinteytres},
        //     {cero:params.cero},
        //     {cancha:params.cancha},
        //     {fechaAlquiler:params.fechaAlquiler}
        //     ]}).exec((err,alquileres)=>{
        //         if(err) return res.status(500).send({message: 'Error en la petición de usuario',error:err});
        //         if(alquileres && alquileres.length >= 1){
        //             return res.status(200).send({message: 'Horario ocupado, no se registro el alquiler.'});
        //         }else{
        //             alquiler.save((err,alquilerRegistrado)=>{
        //                 if (err) return res.status(500).send({message: 'Error al guardar el alquiler',error:err}); 
        //                 if (alquilerRegistrado) {
        //                     res.status(200).send({alquiler: alquilerRegistrado});
        //                 }else{
        //                     res.status(404).send({message: 'No se ha registrado el alquiler'});
        //                 }
        //             })            
        //         }
        //     });
    }else{
        res.status(200).send({message: 'Enviar todos los campos necesarios!!'});
    }
}

module.exports = {
    registrarAlquiler
}