'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

//---------------------------------------------------------------------------------------------

function usuarioDefinido(callback) {
    callback();
}

usuarioDefinido(function usuarioAdministrador(res) {
    var user = new User();

    user.usuario = 'Usuario Administrador';
    user.email = 'administrador';
    user.rol = 'ADMINISTRADOR';

    User.find((err, users) => {
        if (err) return res.status(500).send({ message: 'error en la peticion', err });

        if (users && users.length < 1) {
            bcrypt.hash('123', null, null, (err, hash) => {

                user.password = hash;

                user.save((err, savedUser) => {
                    if (err) return res.status(500).send({ message: 'error en la petcion', err });
    
                    if (savedUser) {
                        console.log('USUARIO por defecto agregado');
                    }
                })

            })

        }
    })
});

//---------------------------------------------------------------------------------------------

var path = require('path');
var fs = require('fs');

function getUsers(req, res) {
    User.find().exec((err, usuariosEncontrados) => {
        if (err) return res.status(500).send({ message: 'ERROR EN LA BUSQUEDA' });
        if (!usuariosEncontrados) return res.status(500).send({ message: 'ERROR 2 EN LA BUESQUEDA' });
        return res.status(200).send({ Usuarios: usuariosEncontrados })
    })
}

function registrar(req, res) {
    var user = new User();
    var params = req.body;

    if (params.usuario && params.email && params.password) {
        user.usuario = params.usuario;
        user.email = params.email;
        user.rol = 'USUARIO';

        User.find({
            $or: [
                { usuario: user.usuario },
                { email: user.email },
            ]
        }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion de usuarios' });

            if (users && users.length >= 1) {
                return res.status(500).send({ message: 'El usuario ya existe' });
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;

                    user.save((err, userStored) => {
                        if (err) return res.status(500).send({ message: 'Error al guardar el usuario' });

                        if (userStored) {
                            res.status(200).send({ userNew: userStored })
                        } else {
                            res.status(404).send({ message: 'no se ha registrado el usuario' });
                        }
                    });
                });
            }
        });
    } else {
        res.status(200).send({
            message: 'Rellene todos los datos necesarios'
        });
    }

}

function login(req, res) {
    var params = req.body;
    var email2 = params.email;
    var password = params.password;

    User.findOne({ email: email2 }, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })

        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    if (params.getToken) {
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        })
                    } else {
                        user.password = undefined;
                        return res.status(200).send({ user })
                    }
                } else {
                    return res.status(404).send({ message: 'el usuario no se a podido identificar' })
                }
            });
        } else {
            return res.status(404).send({ message: 'el usuairo no se a podido logear' })
        }
    });
}



function editarUsuario(req, res) {
    var userId = req.params.id;
    var params = req.body;

    //BORRAR LA PROPIEDAD DE PASSWORD
    delete params.password;

    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'no tiene los permisos para actualizar los datos de este usuario' })
    }

    User.findByIdAndUpdate(userId, params, { new: true }, (err, usuarioActualizado) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' })

        if (!usuarioActualizado) return res.status(404).send({ message: 'no se a podido actualizar los datos del usuario' })

        return res.status(200).send({ user: usuarioActualizado })
    })
}


module.exports = {
    registrar,
    login,
    editarUsuario,
    getUsers
}