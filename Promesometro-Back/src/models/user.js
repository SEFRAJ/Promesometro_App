'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    usuario: String,
    email: String,
    password: String,
    rol: String
});

module.exports = mongoose.model('User', UserSchema);