'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var command_statusCtrlStub = {
  index: 'command_statusCtrl.index',
  show: 'command_statusCtrl.show',
  create: 'command_statusCtrl.create',
  update: 'command_statusCtrl.update',
  destroy: 'command_statusCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var command_statusIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './command_status.controller': command_statusCtrlStub
});

describe('Command_status API Router:', function() {

  it('should return an express router instance', function() {
    command_statusIndex.should.equal(routerStub);
  });

  describe('GET /api/command_statuses', function() {

    it('should route to command_status.controller.index', function() {
      routerStub.get
        .withArgs('/', 'command_statusCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/command_statuses/:id', function() {

    it('should route to command_status.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'command_statusCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/command_statuses', function() {

    it('should route to command_status.controller.create', function() {
      routerStub.post
        .withArgs('/', 'command_statusCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/command_statuses/:id', function() {

    it('should route to command_status.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'command_statusCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/command_statuses/:id', function() {

    it('should route to command_status.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'command_statusCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/command_statuses/:id', function() {

    it('should route to command_status.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'command_statusCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
