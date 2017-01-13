'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var satellite_radioCtrlStub = {
  index: 'satellite_radioCtrl.index',
  show: 'satellite_radioCtrl.show',
  create: 'satellite_radioCtrl.create',
  update: 'satellite_radioCtrl.update',
  destroy: 'satellite_radioCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var satellite_radioIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './satellite_radioCtrl.controller': satellite_radioCtrlStub
});

describe('Satellite_radio API Router:', function() {

  it('should return an express router instance', function() {
    satellite_radioIndex.should.equal(routerStub);
  });

  describe('GET /api/satellite_radios', function() {

    it('should route to satellite_radio.controller.index', function() {
      routerStub.get
        .withArgs('/', 'satellite_radioCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/satellite_radios/:id', function() {

    it('should route to satellite_radio.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'satellite_radioCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/satellite_radios', function() {

    it('should route to satellite_radio.controller.create', function() {
      routerStub.post
        .withArgs('/', 'satellite_radioCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/satellite_radios/:id', function() {

    it('should route to satellite_radio.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'satellite_radioCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/satellite_radios/:id', function() {

    it('should route to satellite_radio.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'satellite_radioCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/satellite_radios/:id', function() {

    it('should route to satellite_radio.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'satellite_radioCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
