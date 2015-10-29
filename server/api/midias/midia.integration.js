'use strict';

var app = require('../..');
var request = require('supertest');

var newMidia;

describe('Midia API:', function() {

  describe('GET /api/midias', function() {
    var midias;

    beforeEach(function(done) {
      request(app)
        .get('/api/midias')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          midias = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      midias.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/midias', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/midias')
        .send({
          name: 'New Midia',
          info: 'This is the brand new midia!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newMidia = res.body;
          done();
        });
    });

    it('should respond with the newly created midia', function() {
      newMidia.name.should.equal('New Midia');
      newMidia.info.should.equal('This is the brand new midia!!!');
    });

  });

  describe('GET /api/midias/:id', function() {
    var midia;

    beforeEach(function(done) {
      request(app)
        .get('/api/midias/' + newMidia._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          midia = res.body;
          done();
        });
    });

    afterEach(function() {
      midia = {};
    });

    it('should respond with the requested midia', function() {
      midia.name.should.equal('New Midia');
      midia.info.should.equal('This is the brand new midia!!!');
    });

  });

  describe('PUT /api/midias/:id', function() {
    var updatedMidia

    beforeEach(function(done) {
      request(app)
        .put('/api/midias/' + newMidia._id)
        .send({
          name: 'Updated Midia',
          info: 'This is the updated midia!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMidia = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMidia = {};
    });

    it('should respond with the updated midia', function() {
      updatedMidia.name.should.equal('Updated Midia');
      updatedMidia.info.should.equal('This is the updated midia!!!');
    });

  });

  describe('DELETE /api/midias/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/midias/' + newMidia._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when midia does not exist', function(done) {
      request(app)
        .delete('/api/midias/' + newMidia._id)
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
