'use strict';

var express = require('express');
var controller = require('./command.controller');
const auth = require('../../auth/auth.service.js');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/mine', auth.isAuthenticated(), controller.mine);
router.get('/log', auth.isAuthenticated(), controller.log);
router.get('/queue', auth.isAuthenticated(), controller.queue);
router.get('/unapproved', auth.isAuthenticated(), controller.unapproved);
router.get('/unscheduled', auth.isAuthenticated(), controller.unscheduled);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/:id/schedule', auth.hasRole('admin'), controller.schedule);
router.post('/:id/unschedule', auth.hasRole('admin'), controller.unschedule);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.post('/:id/approve', auth.isAuthenticated(), controller.approve);

module.exports = router;
