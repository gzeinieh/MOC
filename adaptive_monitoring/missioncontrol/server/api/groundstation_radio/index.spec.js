'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var groundstationCtrlStub = {
  index: 'groundstation_radioCtrl.index',
  show: 'groundstation_radioCtrl.show',
  create: 'groundstation_radioCtrl.create',
  update: 'groundstation_radioCtrl.update',
  destroy: 'groundstation_radioCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var groundstation_radioIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './groundstation_radio.controller': groundstation_radioCtrlStub
});

describe('Groundstation_radio API Router:', function() {

  it('should return an express router instance', function() {
    groundstationIndex.should.equal(routerStub);
  });

  describe('GET /api/groundstations', function() {

    it('should route to groundstation.controller.index', function() {
      routerStub.get
        .withArgs('/', 'groundstationCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/groundstations/:id', function() {

    it('should route to groundstation.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'groundstationCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/groundstations', function() {

    it('should route to groundstation.controller.create', function() {
      routerStub.post
        .withArgs('/', 'groundstationCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/groundstations/:id', function() {

    it('should route to groundstation.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'groundstationCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/groundstations/:id', function() {

    it('should route to groundstation.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'groundstationCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/groundstations/:id', function() {

    it('should route to groundstation.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'groundstationCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
