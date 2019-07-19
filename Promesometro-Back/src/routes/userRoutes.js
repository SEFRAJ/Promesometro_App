'use strict'

var express = require('express');
var UserController = require('../controllers/userController');
var md_auth = require('../middlewares/autheticated');

//SUBIR IMAGEN
var multiparty = require('connect-multiparty');
var md_subir = multiparty({ uploadDir: './src/uploads/users' })


//Rutas
var api = express.Router();
api.post('/registrar', UserController.registrar);
api.post('/login', UserController.login);
api.put('/editar-usuario/:id', md_auth.ensureAuth, UserController.editarUsuario)

api.get('/mostrarUsuarios', UserController.getUsers);

module.exports = api;