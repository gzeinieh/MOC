/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sensors              ->  index
 * POST    /api/sensors              ->  create
 * GET     /api/sensors/:id          ->  show
 * PUT     /api/sensors/:id          ->  update
 * DELETE  /api/sensors/:id          ->  destroy
 * GET     /api/sensors/satellite/:satelliteId   ->  showSatellite
 */

'use strict';

var _ = require('lodash');
var url = require('url') ;
var sqldb = require('../../sqldb');
var Sensor = sqldb.Sensor;
var Type = sqldb.Sensor_type;
Type.hasMany(Sensor, {foreignKey: 'SensorTypeId'})
Sensor.belongsTo(Type, {foreignKey: 'SensorTypeId'})
var acc793Data = sqldb.Acc793
acc793Data.belongsTo(Sensor, {foreignKey: 'SensorId'})
Sensor.hasMany(acc793Data, {foreignKey: 'SensorId'})
var mag3110Data = sqldb.Mag3110
mag3110Data.belongsTo(Sensor, {foreignKey: 'SensorId'})
Sensor.hasMany(mag3110Data, {foreignKey: 'SensorId'})
var Threshold = sqldb.Threshold;
Threshold.belongsTo(Sensor, {foreignKey: 'SensorId'});
Sensor.hasMany(Threshold,{foreignKey: 'SensorId'});

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Sensors
exports.index = function(req, res) {
  Sensor.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Sensor from the DB
exports.show = function(req, res) {
  Sensor.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};


// Gets a Sensor from the DB by satellite
exports.showSatellite = function(req, res) {
  Sensor.findAll({
    where: {
      SatelliteId: req.params.satelliteId
    },
      include:[Type,{model:acc793Data,limit:parseInt(req.query.limitTo),order:'`_id` DESC'},{model:mag3110Data,limit:parseInt(req.query.limitTo),order:'`_id` DESC'},
              {model:Threshold,limit:5,order:'`_id` DESC'}]
      
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Sensor in the DB
exports.create = function(req, res) {
  Sensor.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Sensor in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Sensor.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Sensor from the DB
exports.destroy = function(req, res) {
  Sensor.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
