/**
 * Socket.io configuration
 */

'use strict';

import config from './environment';

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function(data) {
    socket.log(JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/bus/bus.socket').register(socket);
  require('../api/command/command.socket').register(socket);
  require('../api/command_status/command_status.socket').register(socket); 
  require('../api/groundstation/groundstation.socket').register(socket);
  require('../api/groundstation_radio/groundstation_radio.socket').register(socket);
  require('../api/mission/mission.socket').register(socket);
  require('../api/pass/pass.socket').register(socket);
  require('../api/payload/payload.socket').register(socket);
  require('../api/satellite/satellite.socket').register(socket);
  require('../api/satellite_radio/satellite_radio.socket').register(socket);
  require('../api/segment/segment.socket').register(socket);
  require('../api/sensor/sensor.socket').register(socket);
  require('../api/sensor_type/sensor_type.socket').register(socket);
  require('../api/threshold/threshold.socket').register(socket);
  
}

module.exports = function(socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function(socket) {
    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();

    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', function() {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
};
