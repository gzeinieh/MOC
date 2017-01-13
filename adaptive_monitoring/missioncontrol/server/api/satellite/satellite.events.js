/**
 * Satellite model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Satellite = require('../../sqldb').Satellite;
var SatelliteEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SatelliteEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Satellite.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    SatelliteEvents.emit(event + ':' + doc._id, doc);
    SatelliteEvents.emit(event, doc);
    SatelliteEvents.emit(event + 'mission/' +':' + doc.MissionId, doc);
    done(null);
  }
}

module.exports = SatelliteEvents;
