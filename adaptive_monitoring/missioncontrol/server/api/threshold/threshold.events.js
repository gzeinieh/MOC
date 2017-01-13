/**
 * Threshold model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Threshold = require('../../sqldb').Threshold;
var ThresholdEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ThresholdEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Threshold.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ThresholdEvents.emit(event + ':' + doc._id, doc);
    ThresholdEvents.emit(event, doc);
    done(null);
  }
}

module.exports = ThresholdEvents;
