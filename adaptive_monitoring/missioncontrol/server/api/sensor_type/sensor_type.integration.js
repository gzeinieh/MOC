'use strict';

var app = require('../..');
var request = require('supertest');

var newSensor_type;

describe('Sensor_type API:', function() {

  describe('GET /api/Sensor_types', function() {
    var Sensor_types;

    beforeEach(function(done) {
      request(app)
        .get('/api/Sensor_types')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          Sensor_types = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      Sensor_types.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/Sensor_types', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/Sensor_types')
        .send({
          name: 'New Sensor_type',
          info: 'This is the brand new Sensor_type!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSensor_type = res.body;
          done();
        });
    });

    it('should respond with the newly created Sensor_type', function() {
      newSensor_type.name.should.equal('New Sensor_type');
      newSensor_type.info.should.equal('This is the brand new Sensor_type!!!');
    });

  });

  describe('GET /api/Sensor_types/:id', function() {
    var Sensor_type;

    beforeEach(function(done) {
      request(app)
        .get('/api/Sensor_types/' + newSensor_type._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          Sensor_type = res.body;
          done();
        });
    });

    afterEach(function() {
      Sensor_type = {};
    });

    it('should respond with the requested Sensor_type', function() {
      Sensor_type.name.should.equal('New Sensor_type');
      Sensor_type.info.should.equal('This is the brand new Sensor_type!!!');
    });

  });

  describe('PUT /api/Sensor_types/:id', function() {
    var updatedSensor_type

    beforeEach(function(done) {
      request(app)
        .put('/api/Sensor_types/' + newSensor_type._id)
        .send({
          name: 'Updated Sensor_type',
          info: 'This is the updated Sensor_type!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSensor_type = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSensor_type = {};
    });

    it('should respond with the updated Sensor_type', function() {
      updatedSensor_type.name.should.equal('Updated Sensor_type');
      updatedSensor_type.info.should.equal('This is the updated Sensor_type!!!');
    });

  });

  describe('DELETE /api/Sensor_types/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/Sensor_types/' + newSensor_type._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Sensor_type does not exist', function(done) {
      request(app)
        .delete('/api/Sensor_types/' + newSensor_type._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
