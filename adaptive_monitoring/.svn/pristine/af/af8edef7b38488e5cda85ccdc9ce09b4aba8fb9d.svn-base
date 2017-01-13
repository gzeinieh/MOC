/**
 * Sensor_type model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Sensor_type = require('../../sqldb').Sensor_type;
var Sensor_typeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
Sensor_typeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Sensor_type.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    Sensor_typeEvents.emit(event + ':' + doc._id, doc);
    Sensor_typeEvents.emit(event, doc);
    done(null);
  }
}

module.exports = Sensor_typeEvents;
