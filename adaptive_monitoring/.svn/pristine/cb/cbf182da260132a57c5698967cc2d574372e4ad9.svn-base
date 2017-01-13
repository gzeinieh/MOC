'use strict';

var app = require('../..');
var request = require('supertest');

var newCommand_status;

describe('Command_status API:', function() {

  describe('GET /api/command_statuses', function() {
    var command_statuses;

    beforeEach(function(done) {
      request(app)
        .get('/api/command_statuses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          command_statuses = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      command_statuses.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/command_statuses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/command_statuses')
        .send({
          name: 'New Command_status',
          info: 'This is the brand new command_status!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCommand_status = res.body;
          done();
        });
    });

    it('should respond with the newly created command_status', function() {
      newCommand_status.name.should.equal('New Command_status');
      newCommand_status.info.should.equal('This is the brand new Command_status!!!');
    });

  });

  describe('GET /api/command_statuses/:id', function() {
    var command_status;

    beforeEach(function(done) {
      request(app)
        .get('/api/command_statuses/' + newCommand_status._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          command_status = res.body;
          done();
        });
    });

    afterEach(function() {
      command_status = {};
    });

    it('should respond with the requested command_status', function() {
      command_status.name.should.equal('New Command_status');
      command_status.info.should.equal('This is the brand new command_status!!!');
    });

  });

  describe('PUT /api/command_statuses/:id', function() {
    var updatedCommand_status

    beforeEach(function(done) {
      request(app)
        .put('/api/command_statuses/' + newCommand_status._id)
        .send({
          name: 'Updated Command_status',
          info: 'This is the updated command_status!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCommand_status = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCommand_status = {};
    });

    it('should respond with the updated command_status', function() {
      updatedCommand_status.name.should.equal('Updated Command_status');
      updatedCommand_status.info.should.equal('This is the updated command_status!!!');
    });

  });

  describe('DELETE /api/command_statuses/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/command_statuses/' + newCommand_status._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when command_status does not exist', function(done) {
      request(app)
        .delete('/api/command_statuses/' + newCommand_status._id)
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
