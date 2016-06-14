'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var MidiaSchema = new Schema({
  nome: String,
  tipo: String,
  categoria: String,
  batata: String,
  autores: [{type: Schema.Types.ObjectId, ref: 'User'}],
  descricao: String,
  imagem: String,
  arquivo: String,
  preco: { type: Number, default: 0 },
  gratuita: { type: Boolean, default: false },
  ativo: { type: Boolean, default: false },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Midia', MidiaSchema);
