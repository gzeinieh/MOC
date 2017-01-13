'use strict';

var app = require('../..');
var request = require('supertest');

var newGroundstation;

describe('Groundstation API:', function() {

  describe('GET /api/groundstations', function() {
    var groundstations;

    beforeEach(function(done) {
      request(app)
        .get('/api/groundstations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          groundstations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      groundstations.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/groundstations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/groundstations')
        .send({
          name: 'New Groundstation',
          info: 'This is the brand new groundstation!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newGroundstation = res.body;
          done();
        });
    });

    it('should respond with the newly created groundstation', function() {
      newGroundstation.name.should.equal('New Groundstation');
      newGroundstation.info.should.equal('This is the brand new groundstation!!!');
    });

  });

  describe('GET /api/groundstations/:id', function() {
    var groundstation;

    beforeEach(function(done) {
      request(app)
        .get('/api/groundstations/' + newGroundstation._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          groundstation = res.body;
          done();
        });
    });

    afterEach(function() {
      groundstation = {};
    });

    it('should respond with the requested groundstation', function() {
      groundstation.name.should.equal('New Groundstation');
      groundstation.info.should.equal('This is the brand new groundstation!!!');
    });

  });

  describe('PUT /api/groundstations/:id', function() {
    var updatedGroundstation

    beforeEach(function(done) {
      request(app)
        .put('/api/groundstations/' + newGroundstation._id)
        .send({
          name: 'Updated Groundstation',
          info: 'This is the updated groundstation!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGroundstation = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGroundstation = {};
    });

    it('should respond with the updated groundstation', function() {
      updatedGroundstation.name.should.equal('Updated Groundstation');
      updatedGroundstation.info.should.equal('This is the updated groundstation!!!');
    });

  });

  describe('DELETE /api/groundstations/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/groundstations/' + newGroundstation._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when groundstation does not exist', function(done) {
      request(app)
        .delete('/api/groundstations/' + newGroundstation._id)
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
