'use strict';

var app = require('../..');
var request = require('supertest');

var newCommand;

describe('Command API:', function() {

  describe('GET /api/commands', function() {
    var commands;

    beforeEach(function(done) {
      request(app)
        .get('/api/commands')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          commands = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      commands.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/commands', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/commands')
        .send({
          name: 'New Command',
          info: 'This is the brand new command!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCommand = res.body;
          done();
        });
    });

    it('should respond with the newly created command', function() {
      newCommand.name.should.equal('New Command');
      newCommand.info.should.equal('This is the brand new command!!!');
    });

  });

  describe('GET /api/commands/:id', function() {
    var command;

    beforeEach(function(done) {
      request(app)
        .get('/api/commands/' + newCommand._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          command = res.body;
          done();
        });
    });

    afterEach(function() {
      command = {};
    });

    it('should respond with the requested command', function() {
      command.name.should.equal('New Command');
      command.info.should.equal('This is the brand new command!!!');
    });

  });

  describe('PUT /api/commands/:id', function() {
    var updatedCommand

    beforeEach(function(done) {
      request(app)
        .put('/api/commands/' + newCommand._id)
        .send({
          name: 'Updated Command',
          info: 'This is the updated command!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCommand = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCommand = {};
    });

    it('should respond with the updated command', function() {
      updatedCommand.name.should.equal('Updated Command');
      updatedCommand.info.should.equal('This is the updated command!!!');
    });

  });

  describe('DELETE /api/commands/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/commands/' + newCommand._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when command does not exist', function(done) {
      request(app)
        .delete('/api/commands/' + newCommand._id)
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
