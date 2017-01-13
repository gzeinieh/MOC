'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var segmentCtrlStub = {
  index: 'segmentCtrl.index',
  show: 'segmentCtrl.show',
  create: 'segmentCtrl.create',
  update: 'segmentCtrl.update',
  destroy: 'segmentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var segmentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './segment.controller': segmentCtrlStub
});

describe('Segment API Router:', function() {

  it('should return an express router instance', function() {
    segmentIndex.should.equal(routerStub);
  });

  describe('GET /api/segments', function() {

    it('should route to segment.controller.index', function() {
      routerStub.get
        .withArgs('/', 'segmentCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/segments/:id', function() {

    it('should route to segment.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'segmentCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/segments', function() {

    it('should route to segment.controller.create', function() {
      routerStub.post
        .withArgs('/', 'segmentCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/segments/:id', function() {

    it('should route to segment.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'segmentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/segments/:id', function() {

    it('should route to segment.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'segmentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/segments/:id', function() {

    it('should route to segment.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'segmentCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
