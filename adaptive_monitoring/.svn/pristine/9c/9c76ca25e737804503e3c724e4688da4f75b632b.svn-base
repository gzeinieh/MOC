/**
 * Payload model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Payload = require('../../sqldb').Payload;
var PayloadEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PayloadEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Payload.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PayloadEvents.emit(event + ':' + doc._id, doc);
    PayloadEvents.emit(event, doc);
    done(null);
  }
}

module.exports = PayloadEvents;
