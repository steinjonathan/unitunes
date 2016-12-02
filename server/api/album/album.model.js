'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  nome: String,
  midias: [{type: Schema.Types.ObjectId, ref: 'Midia'}]
});

module.exports = mongoose.model('Album', AlbumSchema);
