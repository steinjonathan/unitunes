'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ArquivoSchema = new Schema({
  nome: String,
  path: String
});

module.exports = mongoose.model('Arquivo', ArquivoSchema);
