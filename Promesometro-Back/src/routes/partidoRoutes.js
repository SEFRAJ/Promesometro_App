'use strict'

var express = require('express');
var PartidoController = require('../controllers/partidoController');
var md_auth = require('../middlewares/autheticated');

//SUBIR IMAGEN
var multiparty = require('connect-multiparty');
var md_subir = multiparty({ uploadDir: './src/uploads/users' })


//Rutas
var api = express.Router();
api.post('/addPartido', md_auth.ensureAuth, PartidoController.addPartido);
api.get('/partidos', PartidoController.getPartidos)

api.post('/subir-imagen-partido/:id', [md_auth.ensureAuth, md_subir], PartidoController.subirImagen);
api.get('/obtener-imagen-partido/:nombreImagen', PartidoController.obtenerImagen)
api.delete('/eliminar-partido/:id', md_auth.ensureAuth, PartidoController.eliminarPartido);




module.exports = api;