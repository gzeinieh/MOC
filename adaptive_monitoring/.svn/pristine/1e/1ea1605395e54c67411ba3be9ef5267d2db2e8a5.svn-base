'use strict';

var app = require('../..');
var request = require('supertest');

var newSegment;

describe('Segment API:', function() {

  describe('GET /api/segments', function() {
    var segments;

    beforeEach(function(done) {
      request(app)
        .get('/api/segments')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          segments = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      segments.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/segments', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/segments')
        .send({
          name: 'New Segment',
          info: 'This is the brand new segment!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSegment = res.body;
          done();
        });
    });

    it('should respond with the newly created segment', function() {
      newSegment.name.should.equal('New Segment');
      newSegment.info.should.equal('This is the brand new segment!!!');
    });

  });

  describe('GET /api/segments/:id', function() {
    var segment;

    beforeEach(function(done) {
      request(app)
        .get('/api/segments/' + newSegment._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          segment = res.body;
          done();
        });
    });

    afterEach(function() {
      segment = {};
    });

    it('should respond with the requested segment', function() {
      segment.name.should.equal('New Segment');
      segment.info.should.equal('This is the brand new segment!!!');
    });

  });

  describe('PUT /api/segments/:id', function() {
    var updatedSegment

    beforeEach(function(done) {
      request(app)
        .put('/api/segments/' + newSegment._id)
        .send({
          name: 'Updated Segment',
          info: 'This is the updated segment!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSegment = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSegment = {};
    });

    it('should respond with the updated segment', function() {
      updatedSegment.name.should.equal('Updated Segment');
      updatedSegment.info.should.equal('This is the updated segment!!!');
    });

  });

  describe('DELETE /api/segments/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/segments/' + newSegment._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when segment does not exist', function(done) {
      request(app)
        .delete('/api/segments/' + newSegment._id)
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
