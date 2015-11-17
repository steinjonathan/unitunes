/**
 * Midia model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Midia = require('./midia.model');
var MidiaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MidiaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Midia.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MidiaEvents.emit(event + ':' + doc._id, doc);
    MidiaEvents.emit(event, doc);
  }
}

module.exports = MidiaEvents;
