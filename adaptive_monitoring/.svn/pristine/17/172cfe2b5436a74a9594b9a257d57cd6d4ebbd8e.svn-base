'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var payloadCtrlStub = {
  index: 'payloadCtrl.index',
  show: 'payloadCtrl.show',
  create: 'payloadCtrl.create',
  update: 'payloadCtrl.update',
  destroy: 'payloadCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var payloadIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './payload.controller': payloadCtrlStub
});

describe('Payload API Router:', function() {

  it('should return an express router instance', function() {
    payloadIndex.should.equal(routerStub);
  });

  describe('GET /api/payloads', function() {

    it('should route to payload.controller.index', function() {
      routerStub.get
        .withArgs('/', 'payloadCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/payloads/:id', function() {

    it('should route to payload.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'payloadCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/payloads', function() {

    it('should route to payload.controller.create', function() {
      routerStub.post
        .withArgs('/', 'payloadCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/payloads/:id', function() {

    it('should route to payload.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'payloadCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/payloads/:id', function() {

    it('should route to payload.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'payloadCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/payloads/:id', function() {

    it('should route to payload.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'payloadCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
