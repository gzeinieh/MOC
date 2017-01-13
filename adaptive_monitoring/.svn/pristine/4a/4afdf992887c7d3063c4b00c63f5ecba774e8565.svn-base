/**
 * Command model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Command = require('../../sqldb').Command;
var CommandEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CommandEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Command.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CommandEvents.emit(event + ':' + doc._id, doc);
    CommandEvents.emit(event, doc);
    done(null);
  }
}

module.exports = CommandEvents;
