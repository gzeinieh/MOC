/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/passes              ->  index
 * POST    /api/passes              ->  create
 * GET     /api/passes/:id          ->  show
 * PUT     /api/passes/:id          ->  update
 * DELETE  /api/passes/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Pass = sqldb.Pass;
const Segment = sqldb.Segment;
import * as tracker from 'tracker';

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


exports.segments = function segments(req, res) {
  Pass.find({
    where: {
      _id: req.params.id
    }
  })
    .then(pass => {
      return new Promise(function(resolve, reject) {
        pass.getSegments()
          .then(segments => { resolve(segments)})
      });
    })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Passs
exports.index = function(req, res) {
  Pass.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Pass from the DB
exports.show = function(req, res) {
  Pass.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Pass in the DB
exports.create = function(req, res) {
  Pass.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Pass in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Pass.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Pass from the DB
exports.destroy = function(req, res) {
  Pass.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
