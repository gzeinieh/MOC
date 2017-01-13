/**
 * Mission model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Mission = require('../../sqldb').Mission;
var MissionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MissionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Mission.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    MissionEvents.emit(event + ':' + doc._id, doc);
    MissionEvents.emit(event, doc);
    done(null);
  }
}

module.exports = MissionEvents;
