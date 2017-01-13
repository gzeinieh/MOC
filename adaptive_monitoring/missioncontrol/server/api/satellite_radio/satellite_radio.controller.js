/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/satellite_radios              ->  index
 * POST    /api/satellite_radios             ->  create
 * GET     /api/satellite_radios/:id         ->  show
 * PUT     /api/satellite_radios/:id         ->  update
 * DELETE  /api/satellite_radios/:id       ->  destroy
 */

'use strict';

var _ = require('lodash');
const async = require('async');
var sqldb = require('../../sqldb');
var Satellite_radio = sqldb.Satellite_radio;

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

// Gets a list of Satellite_radios
exports.index = function(req, res) {
  Satellite_radio.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Satellite_radio from the DB
exports.show = function(req, res) {
  Satellite_radio.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Satellite_radio in the DB
exports.create = function(req, res) {
  Satellite_radio.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Satellite_radio in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Satellite_radio.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Satellite_radio from the DB
exports.destroy = function(req, res) {
  Satellite_radio.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
