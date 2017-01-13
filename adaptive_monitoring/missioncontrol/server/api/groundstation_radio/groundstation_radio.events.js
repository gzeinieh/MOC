/**
 * Groundstation_radio model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Groundstation_radio = require('../../sqldb').Groundstation_radio;
var Groundstation_radioEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
Groundstation_radioEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Groundstation_radio.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    Groundstation_radioEvents.emit(event + ':' + doc._id, doc);
    Groundstation_radioEvents.emit(event, doc);
    done(null);
  }
}

module.exports = Groundstation_radioEvents;
