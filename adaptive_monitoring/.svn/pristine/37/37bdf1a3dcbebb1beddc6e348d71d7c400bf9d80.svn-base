/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/commands              ->  index
 * POST    /api/commands              ->  create
 * GET     /api/commands/:id          ->  show
 * PUT     /api/commands/:id          ->  update
 * DELETE  /api/commands/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Command = sqldb.Command;
const User = sqldb.User;

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

// Gets a list of Commands
exports.index = function(req, res) {
  Command.findAll({ include: [{model: User, attributes: ['name']}] })
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.log = function(req, res) {
  Command.findAll({ include: [{model: User, attributes: ['name']}],
                    where: {
                      status: { $ne: 'pending' }
                    }
                  })
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.unscheduled = function(req, res) {
  Command.findAll({ include: [{model: User, attributes: ['name']}],
                    where: {
                      status: 'pending',
                      // approvalStatus: 'approved',
                      SegmentId: null
                    }
                  })
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.queue = function(req, res) {
  Command.findAll({ include: [
    {model: User, attributes: ['name'], as: 'User'},
    {model: User, attributes: ['name'], as: 'approvedBy'}],
                    where: {
                      status: 'pending',
                      approvalStatus: 'approved',
                      SegmentId: {
                        $ne: null
                      }
                    }
                  })
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.schedule = function(req, res) {
  let segment = req.body.SegmentId;

  Command.find({
    where: {
      _id: req.params.id
    }
  })
    .then(command => {
      command.SegmentId = segment;
      command.save()
      .then(responseWithResult(res))
    })
    .catch(handleError(res));
};

exports.unschedule = function(req, res) {
  Command.find({
    where: {
      _id: req.params.id
    }
  })
    .then(command => {
      command.SegmentId = null;
      command.save()
      .then(responseWithResult(res))
    })
    .catch(handleError(res));
};

// Gets Commands made by the current user
exports.mine = function(req, res) {
  let userId = req.user.dataValues._id;
  Command.findAll({ where: {UserID: userId} })
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets unapproved Commands
exports.unapproved = function(req, res) {
  Command.findAll({ where: {
    approvalStatus: 'unapproved',
    SegmentId: {
      $ne: null
    }
  }, include: [{model: User, attributes: ['name']}]  })
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Command from the DB
exports.show = function(req, res) {
  Command.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Command in the DB
exports.create = function(req, res) {
  req.body.UserId = req.user.dataValues._id;
  req.body.status = 'pending';
  req.body.approvalStatus = 'unapproved';
  req.body.SatelliteId = req.body.satellite;

  Command.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

exports.approve = function (req, res) {
  let approvedById = req.user.dataValues._id;
  let approvalStatus = 'approved';

  Command.find({
    where: {
      _id: req.params.id
    }
  })
  .then(handleEntityNotFound(res))
  .then(command => {
    command.approvedById = approvedById;
    command.approvalStatus = approvalStatus;
    command.save()
    .then(responseWithResult(res))
  })
  .catch(handleError(res));
}

// Updates an existing Command in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Command.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};


// Deletes a Command from the DB
exports.destroy = function(req, res) {
  Command.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
