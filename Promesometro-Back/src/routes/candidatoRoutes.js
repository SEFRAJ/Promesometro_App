'use strict'

var express = require('express');
var CandidatoController = require('../controllers/candidatoController');
var md_auth = require('../middlewares/autheticated');

//SUBIR IMAGEN
var multiparty = require('connect-multiparty');
var md_subir = multiparty({ uploadDir: './src/uploads/users' })


//Rutas
var api = express.Router();
api.post('/candidato/:id', md_auth.ensureAuth, CandidatoController.addCandidato)
api.get('/candidatos/:id', md_auth.ensureAuth, CandidatoController.getCandidatos)
api.delete('/eliminar-candidato/:id', md_auth.ensureAuth, CandidatoController.eliminarCandidato)


api.post('/promesa/:id', md_auth.ensureAuth, CandidatoController.addPromesa)
api.get('/promesas/:id', md_auth.ensureAuth, CandidatoController.getPromesas)
api.delete('/eliminar-promesa/:id', md_auth.ensureAuth, CandidatoController.eliminarPromesa)

api.put('/votar/:id', md_auth.ensureAuth, CandidatoController.votar)

api.post('/subir-imagen-candidato/:id', [md_auth.ensureAuth, md_subir], CandidatoController.subirImagen);
api.get('/obtener-imagen-candidato/:nombreImagen', CandidatoController.obtenerImagen)


module.exports = api;