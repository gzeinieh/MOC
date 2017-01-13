'use strict';

var app = require('../..');
var request = require('supertest');

var newBus;

describe('Bus API:', function() {

  describe('GET /api/buses', function() {
    var buses;

    beforeEach(function(done) {
      request(app)
        .get('/api/buses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          buses = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      buses.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/buses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/buses')
        .send({
          name: 'New Bus',
          info: 'This is the brand new bus!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newBus = res.body;
          done();
        });
    });

    it('should respond with the newly created bus', function() {
      newBus.name.should.equal('New Bus');
      newBus.info.should.equal('This is the brand new bus!!!');
    });

  });

  describe('GET /api/buses/:id', function() {
    var bus;

    beforeEach(function(done) {
      request(app)
        .get('/api/buses/' + newBus._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          bus = res.body;
          done();
        });
    });

    afterEach(function() {
      bus = {};
    });

    it('should respond with the requested bus', function() {
      bus.name.should.equal('New Bus');
      bus.info.should.equal('This is the brand new bus!!!');
    });

  });

  describe('PUT /api/buses/:id', function() {
    var updatedBus

    beforeEach(function(done) {
      request(app)
        .put('/api/buses/' + newBus._id)
        .send({
          name: 'Updated Bus',
          info: 'This is the updated bus!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBus = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBus = {};
    });

    it('should respond with the updated bus', function() {
      updatedBus.name.should.equal('Updated Bus');
      updatedBus.info.should.equal('This is the updated bus!!!');
    });

  });

  describe('DELETE /api/buses/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/buses/' + newBus._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bus does not exist', function(done) {
      request(app)
        .delete('/api/buses/' + newBus._id)
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
