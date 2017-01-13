/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/groundstation_radios              ->  index
 * POST    /api/groundstation_radios             ->  create
 * GET     /api/groundstation_radios/:id         ->  show
 * PUT     /api/groundstation_radios/:id         ->  update
 * DELETE  /api/groundstation_radios/:id       ->  destroy
 */

'use strict';

var _ = require('lodash');
const async = require('async');
var sqldb = require('../../sqldb');
var Groundstation_radio = sqldb.Groundstation_radio;

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

// Gets a list of Groundstation_radios
exports.index = function(req, res) {
  Groundstation_radio.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Groundstation_radio from the DB
exports.show = function(req, res) {
  Groundstation_radio.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Groundstation_radio in the DB
exports.create = function(req, res) {
  Groundstation_radio.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Groundstation_radio in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Groundstation_radio.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Groundstation_radio from the DB
exports.destroy = function(req, res) {
  Groundstation_radio.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
