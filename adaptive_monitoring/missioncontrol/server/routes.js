/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/buses', require('./api/bus'));
  app.use('/api/command_status', require('./api/command_status'));
  app.use('/api/commands', require('./api/command'));
  app.use('/api/groundstations', require('./api/groundstation'));
  app.use('/api/groundstation_radios', require('./api/groundstation_radio'));
  app.use('/api/missions', require('./api/mission'));
  app.use('/api/passes', require('./api/pass'));
  app.use('/api/payloads', require('./api/payload'));
  app.use('/api/satellites', require('./api/satellite'));
  app.use('/api/satellite_radios', require('./api/satellite_radio'));
  app.use('/api/segments', require('./api/segment'));
  app.use('/api/sensors', require('./api/sensor'));
  app.use('/api/sensors/sensor_model_data/acc793', require('./api/sensor/sensor_model_data/acc793'));
  app.use('/api/sensors/sensor_model_data/mag3110', require('./api/sensor/sensor_model_data/mag3110'));
  app.use('/api/sensor_types', require('./api/sensor_type'));
  app.use('/api/thresholds', require('./api/threshold'));
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));
 
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
