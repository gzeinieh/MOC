'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mag3110CtrlStub = {
  index: 'mag3110Ctrl.index',
  show: 'mag3110Ctrl.show',
  create: 'mag3110Ctrl.create',
  update: 'mag3110Ctrl.update',
  destroy: 'mag3110Ctrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mag3110Index = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './mag3110.controller': mag3110CtrlStub
});

describe('mag3110 API Router:', function() {

  it('should return an express router instance', function() {
    mag3110Index.should.equal(routerStub);
  });

  describe('GET /api/mag3110', function() {

    it('should route to mag3110.controller.index', function() {
      routerStub.get
        .withArgs('/', 'mag3110Ctrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/mag3110/:id', function() {

    it('should route to mag3110.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'mag3110Ctrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/mag3110', function() {

    it('should route to mag3110.controller.create', function() {
      routerStub.post
        .withArgs('/', 'mag3110Ctrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/mag3110/:id', function() {

    it('should route to mag3110.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'mag3110Ctrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/mag3110/:id', function() {

    it('should route to mag3110.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'mag3110Ctrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/mag3110/:id', function() {

    it('should route to mag3110.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'mag3110Ctrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
