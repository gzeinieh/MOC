'use strict';

var app = require('../..');
var request = require('supertest');

var newSatellite_radio;

describe('Satellite_radio API:', function() {

  describe('GET /api/Satellite_radios', function() {
    var Satellite_radios;

    beforeEach(function(done) {
      request(app)
        .get('/api/Satellite_radios')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          Satellite_radios = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      Satellite_radios.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/Satellite_radios', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/Satellite_radios')
        .send({
          name: 'New Satellite_radio',
          info: 'This is the brand new Satellite_radio!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSatellite_radio = res.body;
          done();
        });
    });

    it('should respond with the newly created Satellite_radio', function() {
      newSatellite_radio.name.should.equal('New Satellite_radio');
      newSatellite_radio.info.should.equal('This is the brand new Satellite_radio!!!');
    });

  });

  describe('GET /api/Satellite_radios/:id', function() {
    var Satellite_radio;

    beforeEach(function(done) {
      request(app)
        .get('/api/Satellite_radios/' + newSatellite_radio._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          Satellite_radio = res.body;
          done();
        });
    });

    afterEach(function() {
      Satellite_radio = {};
    });

    it('should respond with the requested Satellite_radio', function() {
      Satellite_radio.name.should.equal('New Satellite_radio');
      Satellite_radio.info.should.equal('This is the brand new Satellite_radio!!!');
    });

  });

  describe('PUT /api/Satellite_radios/:id', function() {
    var updatedSatellite_radio

    beforeEach(function(done) {
      request(app)
        .put('/api/Satellite_radios/' + newSatellite_radio._id)
        .send({
          name: 'Updated Satellite_radio',
          info: 'This is the updated Satellite_radio!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSatellite_radio = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSatellite_radio = {};
    });

    it('should respond with the updated Satellite_radio', function() {
      updatedSatellite_radio.name.should.equal('Updated Satellite_radio');
      updatedSatellite_radio.info.should.equal('This is the updated Satellite_radio!!!');
    });

  });

  describe('DELETE /api/Satellite_radios/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/Satellite_radios/' + newSatellite_radio._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Satellite_radio does not exist', function(done) {
      request(app)
        .delete('/api/Satellite_radios/' + newSatellite_radio._id)
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
