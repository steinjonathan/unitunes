'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CompraSchema = new Schema({
  nome: String,
  criacao: Date,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  midia: {type: Schema.Types.ObjectId, ref: 'Midia'}
});

module.exports = mongoose.model('Compra', CompraSchema);
