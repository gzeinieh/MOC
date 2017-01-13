'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sensor_typeCtrlStub = {
  index:    'sensor_typeCtrl.index',
  show:     'sensor_typeCtrl.show',
  create:   'sensor_typeCtrl.create',
  update:   'sensor_typeCtrl.update',
  destroy:  'sensor_typeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sensor_type = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sensor_typeCtrl.controller': sensor_typeCtrlStub
});

describe('Sensor_type API Router:', function() {

  it('should return an express router instance', function() {
    sensor_typeIndex.should.equal(routerStub);
  });

  describe('GET /api/sensor_types', function() {

    it('should route to sensor_type.controller.index', function() {
      routerStub.get
        .withArgs('/', 'sensor_typeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/sensor_types/:id', function() {

    it('should route to sensor_type.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'sensor_typeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/sensor_types', function() {

    it('should route to sensor_type.controller.create', function() {
      routerStub.post
        .withArgs('/', 'sensor_typeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/sensor_types/:id', function() {

    it('should route to sensor_type.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'sensor_typeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sensor_types/:id', function() {

    it('should route to sensor_type.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'sensor_typeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sensor_types/:id', function() {

    it('should route to sensor_type.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'sensor_typeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
