'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var commandCtrlStub = {
  index: 'commandCtrl.index',
  show: 'commandCtrl.show',
  create: 'commandCtrl.create',
  update: 'commandCtrl.update',
  destroy: 'commandCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var commandIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './command.controller': commandCtrlStub
});

describe('Command API Router:', function() {

  it('should return an express router instance', function() {
    commandIndex.should.equal(routerStub);
  });

  describe('GET /api/commands', function() {

    it('should route to command.controller.index', function() {
      routerStub.get
        .withArgs('/', 'commandCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/commands/:id', function() {

    it('should route to command.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'commandCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/commands', function() {

    it('should route to command.controller.create', function() {
      routerStub.post
        .withArgs('/', 'commandCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/commands/:id', function() {

    it('should route to command.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'commandCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/commands/:id', function() {

    it('should route to command.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'commandCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/commands/:id', function() {

    it('should route to command.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'commandCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
