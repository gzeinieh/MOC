'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var thresholdCtrlStub = {
  index: 'thresholdCtrl.index',
  show: 'thresholdCtrl.show',
  create: 'thresholdCtrl.create',
  update: 'thresholdCtrl.update',
  destroy: 'thresholdCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var thresholdIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './threshold.controller': thresholdCtrlStub
});

describe('Threshold API Router:', function() {

  it('should return an express router instance', function() {
    thresholdIndex.should.equal(routerStub);
  });

  describe('GET /api/thresholds', function() {

    it('should route to threshold.controller.index', function() {
      routerStub.get
        .withArgs('/', 'thresholdCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/thresholds/:id', function() {

    it('should route to threshold.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'thresholdCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/thresholds', function() {

    it('should route to threshold.controller.create', function() {
      routerStub.post
        .withArgs('/', 'thresholdCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/thresholds/:id', function() {

    it('should route to threshold.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'thresholdCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/thresholds/:id', function() {

    it('should route to threshold.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'thresholdCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/thresholds/:id', function() {

    it('should route to threshold.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'thresholdCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
