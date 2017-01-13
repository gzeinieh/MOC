'use strict';

var app = require('../..');
var request = require('supertest');

var newacc793;

describe('acc793 API:', function() {

  describe('GET /api/acc793', function() {
    var acc793;

    beforeEach(function(done) {
      request(app)
        .get('/api/acc793')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          acc793 = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      acc793.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/acc793', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/acc793')
        .send({
          name: 'New acc793',
          info: 'This is the brand new acc793!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newacc793 = res.body;
          done();
        });
    });

    it('should respond with the newly created acc793', function() {
      newacc793.name.should.equal('New acc793');
      newacc793.info.should.equal('This is the brand new acc793!!!');
    });

  });

  describe('GET /api/acc793/:id', function() {
    var acc793;

    beforeEach(function(done) {
      request(app)
        .get('/api/acc793/' + newacc793._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          acc793 = res.body;
          done();
        });
    });

    afterEach(function() {
      acc793 = {};
    });

    it('should respond with the requested acc793', function() {
      acc793.name.should.equal('New acc793');
      acc793.info.should.equal('This is the brand new acc793!!!');
    });

  });
    
/* for health montiring */
 describe('GET /api/acc793/sensor/:sensorId', function() {
    var acc793;

    beforeEach(function(done) {
      request(app)
        .get('/api/acc793/sensor' + newacc793.SensorId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          acc793 = res.body;
          done();
        });
    });

    afterEach(function() {
      acc793 = {};
    });

    it('should respond with the requested acc793', function() {
      acc793.name.should.equal('New acc793');
      acc793.info.should.equal('This is the brand new acc793!!!');
    });

  });
    

  describe('PUT /api/acc793/:id', function() {
    var updatedacc793

    beforeEach(function(done) {
      request(app)
        .put('/api/acc793/' + newacc793._id)
        .send({
          name: 'Updated acc793',
          info: 'This is the updated acc793!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedacc793 = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedacc793 = {};
    });

    it('should respond with the updated acc793', function() {
      updatedacc793.name.should.equal('Updated acc793');
      updatedacc793.info.should.equal('This is the updated acc793!!!');
    });

  });

  describe('DELETE /api/acc793/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/acc793/' + newacc793._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when acc793 does not exist', function(done) {
      request(app)
        .delete('/api/acc793/' + newacc793._id)
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
