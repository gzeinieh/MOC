'use strict';

var app = require('../..');
var request = require('supertest');

var newThreshold;

describe('Threshold API:', function() {

  describe('GET /api/threholds', function() {
    var threholds;

    beforeEach(function(done) {
      request(app)
        .get('/api/threholds')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          threholds = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      threholds.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/threholds', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/threholds')
        .send({
          name: 'New Threshold',
          info: 'This is the brand new threhold!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newThreshold = res.body;
          done();
        });
    });

    it('should respond with the newly created threhold', function() {
      newThreshold.name.should.equal('New Threshold');
      newThreshold.info.should.equal('This is the brand new threhold!!!');
    });

  });

  describe('GET /api/threholds/:id', function() {
    var threhold;

    beforeEach(function(done) {
      request(app)
        .get('/api/threholds/' + newThreshold._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          threhold = res.body;
          done();
        });
    });

    afterEach(function() {
      threhold = {};
    });

    it('should respond with the requested threhold', function() {
      threhold.name.should.equal('New Threshold');
      threhold.info.should.equal('This is the brand new threhold!!!');
    });

  });

  describe('PUT /api/threholds/:id', function() {
    var updatedThreshold

    beforeEach(function(done) {
      request(app)
        .put('/api/threholds/' + newThreshold._id)
        .send({
          name: 'Updated Threshold',
          info: 'This is the updated threhold!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedThreshold = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedThreshold = {};
    });

    it('should respond with the updated threhold', function() {
      updatedThreshold.name.should.equal('Updated Threshold');
      updatedThreshold.info.should.equal('This is the updated threhold!!!');
    });

  });

  describe('DELETE /api/threholds/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/threholds/' + newThreshold._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when threhold does not exist', function(done) {
      request(app)
        .delete('/api/threholds/' + newThreshold._id)
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
