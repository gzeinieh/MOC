'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var acc793CtrlStub = {
  index: 'acc793Ctrl.index',
  show: 'acc793Ctrl.show',
  create: 'acc793Ctrl.create',
  update: 'acc793Ctrl.update',
  destroy: 'acc793Ctrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var acc793Index = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './acc793.controller': acc793CtrlStub
});

describe('acc793 API Router:', function() {

  it('should return an express router instance', function() {
    acc793Index.should.equal(routerStub);
  });

  describe('GET /api/acc793', function() {

    it('should route to acc793.controller.index', function() {
      routerStub.get
        .withArgs('/', 'acc793Ctrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/acc793/:id', function() {

    it('should route to acc793.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'acc793Ctrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/acc793', function() {

    it('should route to acc793.controller.create', function() {
      routerStub.post
        .withArgs('/', 'acc793Ctrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/acc793/:id', function() {

    it('should route to acc793.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'acc793Ctrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/acc793/:id', function() {

    it('should route to acc793.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'acc793Ctrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/acc793/:id', function() {

    it('should route to acc793.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'acc793Ctrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
