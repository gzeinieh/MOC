'use strict';

var app = require('../..');
var request = require('supertest');

var newmag3110;

describe('mag3110 API:', function() {

  describe('GET /api/mag3110', function() {
    var mag3110;

    beforeEach(function(done) {
      request(app)
        .get('/api/mag3110')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          mag3110 = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      mag3110.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/mag3110', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/mag3110')
        .send({
          name: 'New mag3110',
          info: 'This is the brand new mag3110!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newmag3110 = res.body;
          done();
        });
    });

    it('should respond with the newly created mag3110', function() {
      newmag3110.name.should.equal('New mag3110');
      newmag3110.info.should.equal('This is the brand new mag3110!!!');
    });

  });

  describe('GET /api/mag3110/:id', function() {
    var mag3110;

    beforeEach(function(done) {
      request(app)
        .get('/api/mag3110/' + newmag3110._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          mag3110 = res.body;
          done();
        });
    });

    afterEach(function() {
      mag3110 = {};
    });

    it('should respond with the requested mag3110', function() {
      mag3110.name.should.equal('New mag3110');
      mag3110.info.should.equal('This is the brand new mag3110!!!');
    });

  });

/* for health montiring */
 describe('GET /api/mag3110/sensor/:sensorId', function() {
    var mag3110;

    beforeEach(function(done) {
      request(app)
        .get('/api/mag3110/sensor' + newmag3110.SensorId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          mag3110 = res.body;
          done();
        });
    });

    afterEach(function() {
      mag3110 = {};
    });

    it('should respond with the requested mag3110', function() {
      mag3110.name.should.equal('New mag3110');
      mag3110.info.should.equal('This is the brand new mag3110!!!');
    });

  });    
    
  describe('PUT /api/mag3110/:id', function() {
    var updatedmag3110

    beforeEach(function(done) {
      request(app)
        .put('/api/mag3110/' + newmag3110._id)
        .send({
          name: 'Updated mag3110',
          info: 'This is the updated mag3110!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedmag3110 = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedmag3110 = {};
    });

    it('should respond with the updated mag3110', function() {
      updatedmag3110.name.should.equal('Updated mag3110');
      updatedmag3110.info.should.equal('This is the updated mag3110!!!');
    });

  });

  describe('DELETE /api/mag3110/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/mag3110/' + newmag3110._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when mag3110 does not exist', function(done) {
      request(app)
        .delete('/api/mag3110/' + newmag3110._id)
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
