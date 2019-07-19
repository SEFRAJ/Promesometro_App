'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CandidatoSchema = Schema({
    nombre: String,
    descripcion: String,
    cargo: String,
    idPartido: String,
    image: String
});

module.exports = mongoose.model('Candidato', CandidatoSchema);