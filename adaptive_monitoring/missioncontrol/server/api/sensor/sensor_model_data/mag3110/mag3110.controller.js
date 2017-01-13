/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     	 /api/sensor/sensor_model_data/mag3110              ->  index
 * POST      /api/sensor/sensor_model_data/mag3110              ->  create
 * GET    	 /api/sensor/sensor_model_data/mag3110:id          ->  show
 * PUT     	 /api/sensor/sensor_model_data/mag3110:id          ->  update
 * DELETE  /api/sensor/sensor_model_data/mag3110/:id     ->  destroy
 * GET  /api/sensor/sensor_model_data/mag3110/sensor/:sensorId     ->  showSensor

 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../../../sqldb');
var Mag3110 = sqldb.Mag3110;

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

// Gets a list of all mag3110 records from DB
exports.index = function(req, res) {
  Mag3110.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single mag3110 record from the DB
exports.show = function(req, res) {
  Mag3110.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a mag3110 records from the DB by sensor ID
exports.showSensor = function(req, res) {
  Mag3110.findAll({
    where: {
      SensorID: req.params.sensorId
    },
    limit: 20
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new mag3110 record in the DB
exports.create = function(req, res) {
  Mag3110.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing mag3110 record in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Mag3110.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a mag3110 record from the DB
exports.destroy = function(req, res) {
  Mag3110.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
