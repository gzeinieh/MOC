/**
 * Satellite_radio model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Satellite_radio = require('../../sqldb').Satellite_radio;
var Satellite_radioEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
Satellite_radioEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Satellite_radio.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    Satellite_radioEvents.emit(event + ':' + doc._id, doc);
    Satellite_radioEvents.emit(event, doc);
    done(null);
  }
}

module.exports = Satellite_radioEvents;
