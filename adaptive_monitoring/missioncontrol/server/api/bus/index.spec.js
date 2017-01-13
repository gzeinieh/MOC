'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var busCtrlStub = {
  index: 'busCtrl.index',
  show: 'busCtrl.show',
  create: 'busCtrl.create',
  update: 'busCtrl.update',
  destroy: 'busCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var busIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './bus.controller': busCtrlStub
});

describe('Bus API Router:', function() {

  it('should return an express router instance', function() {
    busIndex.should.equal(routerStub);
  });

  describe('GET /api/buses', function() {

    it('should route to bus.controller.index', function() {
      routerStub.get
        .withArgs('/', 'busCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/buses/:id', function() {

    it('should route to bus.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'busCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/buses', function() {

    it('should route to bus.controller.create', function() {
      routerStub.post
        .withArgs('/', 'busCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/buses/:id', function() {

    it('should route to bus.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'busCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/buses/:id', function() {

    it('should route to bus.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'busCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/buses/:id', function() {

    it('should route to bus.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'busCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
