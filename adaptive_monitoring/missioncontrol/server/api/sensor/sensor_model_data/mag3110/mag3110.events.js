/**
 * Mag3110 model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var mag3110 = require('../../../../sqldb').mag3110;
var mag3110Events = new EventEmitter();

// Set max event listeners (0 == unlimited)
mag3110Events.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  mag3110.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    mag3110Events.emit(event + ':' + doc._id, doc);
    mag3110Events.emit(event, doc);
    mag3110Events.emit(event + 'sensor/' +':' + doc.SensorId, doc);
    done(null);
  }
}

module.exports = mag3110Events;
