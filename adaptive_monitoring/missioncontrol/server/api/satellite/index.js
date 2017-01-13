'use strict';

var express = require('express');
var controller = require('./satellite.controller');
const auth = require('../../auth/auth.service.js');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/segments', auth.isAuthenticated(), controller.segments);
router.get('/:id/locations', auth.isAuthenticated(), controller.locations);
router.get('/:id/location', auth.isAuthenticated(), controller.currentLocation);
router.get('/:id/futureLocation', auth.isAuthenticated(), controller.futureLocation);
router.get('/:id/assignedSegments', controller.assignedSegments);
router.post('/', auth.hasRole('admin'), auth.isAuthenticated(), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/mission/:missionId', auth.isAuthenticated(), controller.showMission);

module.exports = router;