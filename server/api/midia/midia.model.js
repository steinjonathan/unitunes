'use strict';

var path = require('path');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;
var make_upload_to_model = filePluginLib.make_upload_to_model;

var uploads_base = path.join(__dirname, "uploads");
var uploads = path.join(uploads_base, "u");

var Schema = mongoose.Schema;

var MidiaCategoriaSchema = new Schema({
  nome: String
});

var MidiaSchema = new Schema({
  nome: String,
  tipo: String,
  categoria: ['Música', 'Vídeo', 'Livro', 'Podcast'],
  autores: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  descricao: String,
  imagem: { data: Buffer, contentType: String },
  preco: Number,
  ativo: Boolean
});

// MidiaSchema.plugin(filePlugin, {
//     name: "arquivo",
//     upload_to: make_upload_to_model(uploads, 'midias'),
//     relative_to: uploads_base
// });

module.exports = mongoose.model('Midia', MidiaSchema);
