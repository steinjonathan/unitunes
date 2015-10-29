'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var MidiaSchema = new Schema({
  nome: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Midia', MidiaSchema);
