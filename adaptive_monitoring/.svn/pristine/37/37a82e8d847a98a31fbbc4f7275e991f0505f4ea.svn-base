/**
 * Bus model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Bus = require('../../sqldb').Bus;
var BusEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BusEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Bus.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    BusEvents.emit(event + ':' + doc._id, doc);
    BusEvents.emit(event, doc);
    done(null);
  }
}

module.exports = BusEvents;
