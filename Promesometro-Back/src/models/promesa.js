'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PromesaSchema = Schema({
    titulo: String,
    descripcion: String,
    idCandidato: String,
    idPartido: String,
    si: Number,
    promedio1: Number,
    promedio2: Number,
    no: Number,
    usuarios: []
});

module.exports = mongoose.model('Promesa', PromesaSchema);