/**
 * Pass model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Pass = require('../../sqldb').Pass;
var PassEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PassEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Pass.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PassEvents.emit(event + ':' + doc._id, doc);
    PassEvents.emit(event, doc);
    done(null);
  }
}

module.exports = PassEvents;
