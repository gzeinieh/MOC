'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var satelliteCtrlStub = {
  index: 'satelliteCtrl.index',
  show: 'satelliteCtrl.show',
  create: 'satelliteCtrl.create',
  update: 'satelliteCtrl.update',
  destroy: 'satelliteCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var satelliteIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './satellite.controller': satelliteCtrlStub
});

describe('Satellite API Router:', function() {

  it('should return an express router instance', function() {
    satelliteIndex.should.equal(routerStub);
  });

  describe('GET /api/satellites', function() {

    it('should route to satellite.controller.index', function() {
      routerStub.get
        .withArgs('/', 'satelliteCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/satellites/:id', function() {

    it('should route to satellite.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'satelliteCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/satellites', function() {

    it('should route to satellite.controller.create', function() {
      routerStub.post
        .withArgs('/', 'satelliteCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/satellites/:id', function() {

    it('should route to satellite.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'satelliteCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/satellites/:id', function() {

    it('should route to satellite.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'satelliteCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/satellites/:id', function() {

    it('should route to satellite.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'satelliteCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
