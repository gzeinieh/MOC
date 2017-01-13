/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/thresholds              ->  index
 * POST    /api/thresholds              ->  create
 * GET     /api/thresholds/:id          ->  show
 * PUT     /api/thresholds/:id          ->  update
 * DELETE  /api/thresholds/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Threshold = sqldb.Threshold;

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

// Gets a list of Thresholds
exports.index = function(req, res) {
  Threshold.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};



// Gets a single Threshold from the DB
exports.show = function(req, res) {
  Threshold.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Threshold in the DB
exports.create = function(req, res) {
  Threshold.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Threshold in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Threshold.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Threshold from the DB
exports.destroy = function(req, res) {
  Threshold.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
