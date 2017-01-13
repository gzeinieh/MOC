'use strict';

var app = require('../..');
var request = require('supertest');

var newPayload;

describe('Payload API:', function() {

  describe('GET /api/payloads', function() {
    var payloads;

    beforeEach(function(done) {
      request(app)
        .get('/api/payloads')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          payloads = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      payloads.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/payloads', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/payloads')
        .send({
          name: 'New Payload',
          info: 'This is the brand new payload!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newPayload = res.body;
          done();
        });
    });

    it('should respond with the newly created payload', function() {
      newPayload.name.should.equal('New Payload');
      newPayload.info.should.equal('This is the brand new payload!!!');
    });

  });

  describe('GET /api/payloads/:id', function() {
    var payload;

    beforeEach(function(done) {
      request(app)
        .get('/api/payloads/' + newPayload._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          payload = res.body;
          done();
        });
    });

    afterEach(function() {
      payload = {};
    });

    it('should respond with the requested payload', function() {
      payload.name.should.equal('New Payload');
      payload.info.should.equal('This is the brand new payload!!!');
    });

  });

  describe('PUT /api/payloads/:id', function() {
    var updatedPayload

    beforeEach(function(done) {
      request(app)
        .put('/api/payloads/' + newPayload._id)
        .send({
          name: 'Updated Payload',
          info: 'This is the updated payload!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPayload = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPayload = {};
    });

    it('should respond with the updated payload', function() {
      updatedPayload.name.should.equal('Updated Payload');
      updatedPayload.info.should.equal('This is the updated payload!!!');
    });

  });

  describe('DELETE /api/payloads/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/payloads/' + newPayload._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when payload does not exist', function(done) {
      request(app)
        .delete('/api/payloads/' + newPayload._id)
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
