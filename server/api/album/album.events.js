/**
 * Album model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Album = require('./album.model');
var AlbumEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AlbumEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Album.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AlbumEvents.emit(event + ':' + doc._id, doc);
    AlbumEvents.emit(event, doc);
  }
}

module.exports = AlbumEvents;
