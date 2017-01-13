'use strict';

var app = require('../..');
var request = require('supertest');

var newSatellite;

describe('Satellite API:', function() {

  describe('GET /api/satellites', function() {
    var satellites;

    beforeEach(function(done) {
      request(app)
        .get('/api/satellites')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          satellites = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      satellites.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/satellites', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/satellites')
        .send({
          name: 'New Satellite',
          info: 'This is the brand new satellite!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSatellite = res.body;
          done();
        });
    });

    it('should respond with the newly created satellite', function() {
      newSatellite.name.should.equal('New Satellite');
      newSatellite.info.should.equal('This is the brand new satellite!!!');
    });

  });

  describe('GET /api/satellites/:id', function() {
    var satellite;

    beforeEach(function(done) {
      request(app)
        .get('/api/satellites/' + newSatellite._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          satellite = res.body;
          done();
        });
    });

    afterEach(function() {
      satellite = {};
    });

    it('should respond with the requested satellite', function() {
      satellite.name.should.equal('New Satellite');
      satellite.info.should.equal('This is the brand new satellite!!!');
    });

  });
  
/*
Get sattlite by mission 
*/
    
  describe('GET /api/satellites/mission/:missionId', function() {
    var satellite;

    beforeEach(function(done) {
      request(app)
        .get('/api/satellites/mission/' + newSatellite.MissionId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          satellite = res.body;
          done();
        });
    });

    afterEach(function() {
      satellite = {};
    });

    it('should respond with the requested satellite', function() {
      satellite.name.should.equal('New Satellite');
      satellite.info.should.equal('This is the brand new satellite!!!');
    });

  });

  describe('PUT /api/satellites/:id', function() {
    var updatedSatellite

    beforeEach(function(done) {
      request(app)
        .put('/api/satellites/' + newSatellite._id)
        .send({
          name: 'Updated Satellite',
          info: 'This is the updated satellite!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSatellite = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSatellite = {};
    });

    it('should respond with the updated satellite', function() {
      updatedSatellite.name.should.equal('Updated Satellite');
      updatedSatellite.info.should.equal('This is the updated satellite!!!');
    });

  });

  describe('DELETE /api/satellites/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/satellites/' + newSatellite._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when satellite does not exist', function(done) {
      request(app)
        .delete('/api/satellites/' + newSatellite._id)
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