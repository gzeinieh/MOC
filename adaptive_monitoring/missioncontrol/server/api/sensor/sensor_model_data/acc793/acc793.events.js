/**
 * Acc793 model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var acc793 = require('../../../../sqldb').acc793;
var acc793Events = new EventEmitter();

// Set max event listeners (0 == unlimited)
acc793Events.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  acc793.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    acc793Events.emit(event + ':' + doc._id, doc);
    acc793Events.emit(event, doc);
    acc793Events.emit(event + 'sensor/' +':' + doc.SensorId, doc);
    done(null);
  }
}

module.exports = acc793Events;
