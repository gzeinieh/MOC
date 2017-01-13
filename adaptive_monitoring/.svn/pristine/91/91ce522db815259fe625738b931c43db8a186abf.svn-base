/**
 * Groundstation model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Groundstation = require('../../sqldb').Groundstation;
var GroundstationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GroundstationEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Groundstation.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    GroundstationEvents.emit(event + ':' + doc._id, doc);
    GroundstationEvents.emit(event, doc);
    done(null);
  }
}

module.exports = GroundstationEvents;
