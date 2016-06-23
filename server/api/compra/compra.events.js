/**
 * Album model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Compra = require('./compra.model');
var CompraEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CompraEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Compra.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CompraEvents.emit(event + ':' + doc._id, doc);
    CompraEvents.emit(event, doc);
  }
}

module.exports = CompraEvents;
