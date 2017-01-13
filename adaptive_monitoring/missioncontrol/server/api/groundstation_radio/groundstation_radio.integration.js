'use strict';

var app = require('../..');
var request = require('supertest');

var newGroundstation_radio;

describe('Groundstation_radio API:', function() {

  describe('GET /api/Groundstation_radios', function() {
    var Groundstation_radios;

    beforeEach(function(done) {
      request(app)
        .get('/api/Groundstation_radios')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          Groundstation_radios = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      Groundstation_radios.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/Groundstation_radios', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/Groundstation_radios')
        .send({
          name: 'New Groundstation_radio',
          info: 'This is the brand new Groundstation_radio!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newGroundstation_radio = res.body;
          done();
        });
    });

    it('should respond with the newly created Groundstation_radio', function() {
      newGroundstation_radio.name.should.equal('New Groundstation_radio');
      newGroundstation_radio.info.should.equal('This is the brand new Groundstation_radio!!!');
    });

  });

  describe('GET /api/Groundstation_radios/:id', function() {
    var Groundstation_radio;

    beforeEach(function(done) {
      request(app)
        .get('/api/Groundstation_radios/' + newGroundstation_radio._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          Groundstation_radio = res.body;
          done();
        });
    });

    afterEach(function() {
      Groundstation_radio = {};
    });

    it('should respond with the requested Groundstation_radio', function() {
      Groundstation_radio.name.should.equal('New Groundstation_radio');
      Groundstation_radio.info.should.equal('This is the brand new Groundstation_radio!!!');
    });

  });

  describe('PUT /api/Groundstation_radios/:id', function() {
    var updatedGroundstation_radio

    beforeEach(function(done) {
      request(app)
        .put('/api/Groundstation_radios/' + newGroundstation_radio._id)
        .send({
          name: 'Updated Groundstation_radio',
          info: 'This is the updated Groundstation_radio!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGroundstation_radio = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGroundstation_radio = {};
    });

    it('should respond with the updated Groundstation_radio', function() {
      updatedGroundstation_radio.name.should.equal('Updated Groundstation_radio');
      updatedGroundstation_radio.info.should.equal('This is the updated Groundstation_radio!!!');
    });

  });

  describe('DELETE /api/Groundstation_radios/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/Groundstation_radios/' + newGroundstation_radio._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Groundstation_radio does not exist', function(done) {
      request(app)
        .delete('/api/Groundstation_radios/' + newGroundstation_radio._id)
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
