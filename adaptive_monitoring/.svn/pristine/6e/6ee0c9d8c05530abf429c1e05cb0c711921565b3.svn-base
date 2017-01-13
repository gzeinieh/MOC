/**
 * Command_status model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Command_status = require('../../sqldb').Command_status;
var Command_statusEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
Command_statusEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Command_status.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    Command_statusEvents.emit(event + ':' + doc._id, doc);
    Command_statusEvents.emit(event, doc);
    done(null);
  }
}

module.exports = Command_statusEvents;
