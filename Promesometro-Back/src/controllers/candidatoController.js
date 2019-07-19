'use strict'

var Candidato = require('../models/candidatos');
var Promesa = require('../models/promesa');
var path = require('path');
var fs = require('fs');




function addCandidato(req, res) {
    var candidato = new Candidato();
    var partidoId = req.params.id;
    var params = req.body;

    if (req.user.rol == 'ADMINISTRADOR') {

        if (params.nombre && params.descripcion && params.cargo) {
            candidato.nombre = params.nombre;
            candidato.descripcion = params.descripcion;
            candidato.idPartido = partidoId;
            candidato.cargo = params.cargo;
            candidato.image = null;

            Candidato.findOne({ nombre: candidato.nombre }, (err, buscado) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion' })
                if (buscado) {
                    res.status(200).send({
                        message: 'Este candidato ya fue inscrito'
                    })
                } else {

                    /*Candidato.find( {idPartido: partidoId,cargo: partidoId},(err, cargoExis) => {
                        if (err) return res.status(500).send({ message: 'Error en la peticion' })
                        if (!cargoExis) return res.status(404).send({ message: 'Error' })
                        
                        if(cargoExis=>1){
                            return res.status(200).send({ message: 'Este cargo ya fue asignado' })
                        }else{*/



                    candidato.save((err, candidatoGuardado) => {
                        if (err) return res.status(500).send({ message: 'Error en el candidato' })
                        if (!candidatoGuardado) return res.status(500).send({ message: 'Error al agregar al candidato' })

                        return res.status(200).send({ candidato: candidatoGuardado });
                    })

                    // }

                    //})



                }
            })

        } else {
            res.status(200).send({
                message: 'Rellene todos los datos necesarios'
            })
        }

    } else {
        res.status(200).send({
            message: 'Solo ADMINISTRADORES pueden inscribir candidatos'
        })
    }
}

function getCandidatos(req, res) {
    var partidoId = req.params.id;

    Candidato.find({ idPartido: partidoId }).exec((err, candidatos) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!candidatos) return res.status(404).send({ message: 'Error al listar los candidatos' })
        return res.status(200).send({ listaCandidatos: candidatos })
    })

}


//  ----------------------------------------------------------------------

function eliminarCandidato(req,res){
    var idCandidato = req.params.id;

    if(req.user.rol == 'ADMINISTRADOR'){

    }else{

    }

    Candidato.findByIdAndDelete(idCandidato, (err, eliminado) =>{
        if (err) return res.status(500).send({message:'error en la peticion de eliminar candidato',err})

        if(eliminado){
            Promesa.deleteMany({idCandidato:idCandidato}, (err, eliminados) =>{
                if (err) return res.status(500).send({message:'error en la peticion de eliminar promesas de candidatos',err})
                
                if(eliminados){
                    return res.status(200).send({message:'eliminacion exitosa del candidato'})
                }else{
                    return res.status(200).send({message:'error al eliminar un canditato y promesas'})
                }
            })
        }else {
            res.status(500).send({
                message: 'Solo ADMINISTRADORES pueden eliminar candidatos'
            })
        }
    })
}

//  ----------------------------------------------------------------------
//  PROMESAS

function addPromesa(req, res) {
    var promesa = new Promesa();
    var candidatoId = req.params.id;
    var params = req.body;
    var num1;
    var num2;

    if (req.user.rol == 'ADMINISTRADOR') {

        if (params.titulo && params.descripcion) {


            ///preguntar por que no pueden ir a fuera --- la asignacion de promes.titulo, descripcion etc no tiene alcanze solo con  idPartido

            Candidato.findById(candidatoId, (err,candidato)=>{
                //console.log(candidatoId)
                if (err) return res.status(500).send({ message: 'Error en la busqueda',err })
                //console.log(candidato)
                if(candidato){

                    promesa.titulo = params.titulo;
                    promesa.descripcion = params.descripcion;
                    promesa.idCandidato = candidatoId;
                    
                   promesa.idPartido = candidato.idPartido;


                   promesa.si = 0;
                   promesa.no = 0;
                   promesa.promedio1 = 0;
                   promesa.promedio2 = 0;
                   promesa.usuarios = [];

                   promesa.save((err, Guardado) => {
                    if (err) return res.status(500).send({ message: 'Error en el candidato' })
                    if (!Guardado) return res.status(500).send({ message: 'Error al agregar al candidato' })
    
                    return res.status(200).send({ promesa: Guardado });
                    })
    
                }
            })

        }

    } else {
        res.status(200).send({
            message: 'Solo ADMINISTRADORES pueden redactar promesas'
        })
    }
}
//  ----------------------------------------------------------------------
//  PROMESAS
function votar(req, res) {
    var promesa = new Promesa();
    var promesaId = req.params.id;
    var params = req.body;
    var num1;
    var num2;
    var num3;
    var votoUsuario = true;
    console.log(params.si);
    console.log(params.no);
    promesa.si = params.si;
    promesa.no = params.no;
    Promesa.findById(promesaId, (err, results) => {
        if (err) return res.status(404).send({ message: "error en la peticion 1" });
        if (!results) return res.status(500).send({ message: "error al listar la encuesta 2" });


        for (let x = 0; x < results.usuarios.length; x++) {
            if (results.usuarios[x] === req.user.sub) {
                votoUsuario = false;
                return res.status(200).send({ message: "Usted ya voto en esta promesa" });
            }
        }
        if (votoUsuario == true) {
            Promesa.findByIdAndUpdate(promesaId, {
                $inc: { si: params.si, no: params.no }
            }, { new: true }, (err, result) => {
                if (err) return res.status(404).send({ message: "error en la peticion 3 ", err });
                if (!result) return res.status(500).send({ message: "error al listar la encuesta 4" });

                num1 = result.si + result.no;
                num2 = (result.si * 100) / num1;
                promesa.promedio1 = num2;

                num3 = (result.no * 100) / num1;
                promesa.promedio1 = num3;



                Promesa.findByIdAndUpdate(promesaId, {
                    promedio1: num2,
                    promedio2: num3
                }, { new: true }, (err, statu) => {
                    if (err) return res.status(404).send({ message: "error en la peticion de encuesta 5" });
                    if (!statu) return res.status(500).send({ message: "error al votar promesa 6" });
                    statu.usuarios.push(req.user.sub);
                    statu.save();
                    return res.status(200).send({ statu })
                });
            })
        }
    })

}

//  ----------------------------------------------------------------------

function subirImagen(req, res) {
    var candidatoId = req.params.id;

    if (req.files) {
        var file_path = req.files.image.path;
        console.log(file_path);

        var file_split = file_path.split('\\');
        console.log(file_split);

        var file_name = file_split[3];
        console.log(file_name);

        var ext_split = file_name.split('\.');
        console.log(ext_split);

        var file_ext = ext_split[1];
        console.log(file_ext);

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            Candidato.findByIdAndUpdate(candidatoId, { image: file_name }, { new: true }, (err, candidatoActualizado) => {
                if (err) return res.status(500).send({ message: ' no se a podido actualizar el usuario' })

                if (!candidatoActualizado) return res.status(404).send({ message: 'error en los datos del usuario, no se pudo actualizar' })

                return res.status(200).send({ candidato: candidatoActualizado });
            })
        } else {
            return removeFilesOfUploads(res, file_path, 'extension no valida')
        }

    }
}
//  ----------------------------------------------------------------------
function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message })
    })
}
//  ----------------------------------------------------------------------

function obtenerImagen(req, res) {
    var image_file = req.params.nombreImagen;
    var path_file = './src/uploads/users/' + image_file;

    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'no existe la imagen' })
        }
    });
}

//  ----------------------------------------------------------------------

function getPromesas(req, res) {
    var candidatoId = req.params.id;

    Promesa.find({ idCandidato: candidatoId }).exec((err, promesas) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!promesas) return res.status(404).send({ message: 'Error al listar las promesas' })
        return res.status(200).send({ listaPromesas: promesas })
    })

}

//  ----------------------------------------------------------------------

function eliminarPromesa(req,res){
    var idPromesa = req.params.id;

    if(req.user.rol == 'ADMINISTRADOR'){

        Promesa.findByIdAndDelete( idPromesa, (err, promesa)=>{
            if (err) return res.status(500).send({message: 'Error en la peticion de eliminacion', err})
    
            if(promesa){
                return res.status(200).send({message:'promesa eliminada exitosamente'})
            }else{
                return res.status(404).send({message:'error al intetar elminar la promesa, Existe la promesa?'})
            }
        })

    }else {
        res.status(500).send({
            message: 'Solo ADMINISTRADORES pueden eliminar promesas'
        })
    }
}

//  ----------------------------------------------------------------------

module.exports = {
    addCandidato,
    getCandidatos,
    eliminarCandidato,

    subirImagen,
    obtenerImagen,

    addPromesa,
    getPromesas,
    votar,
    eliminarPromesa
}