/**
 * Arquivo model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Arquivo = require('./arquivo.model');
var ArquivoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ArquivoEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Arquivo.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ArquivoEvents.emit(event + ':' + doc._id, doc);
    ArquivoEvents.emit(event, doc);
  }
}

module.exports = ArquivoEvents;
