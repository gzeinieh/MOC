/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     	 /api/sensor/sensor_model_data/acc793              ->  index
 * POST      /api/sensor/sensor_model_data/acc793              ->  create
 * GET    	 /api/sensor/sensor_model_data/acc793:id          ->  show
 * PUT     	 /api/sensor/sensor_model_data/acc793:id          ->  update
 * DELETE  /api/sensor/sensor_model_data/acc793/:id     ->  destroy
 * GET  /api/sensor/sensor_model_data/acc793/sensor/:sensorId     ->  showSensor
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../../../sqldb');
var Acc793 = sqldb.Acc793;

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

// Gets a list of all acc793 records from DB
exports.index = function(req, res) {
  Acc793.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single acc793 record from the DB
exports.show = function(req, res) {
  Acc793.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a acc793 records from the DB by sensor ID
exports.showSensor = function(req, res) {
  Acc793.findAll({
    where: {
      SensorID: req.params.sensorId
    },
    limit: 20
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};



// Creates a new acc793 record in the DB
exports.create = function(req, res) {
  Acc793.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing acc793 record in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Acc793.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a acc793 record from the DB
exports.destroy = function(req, res) {
  Acc793.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
