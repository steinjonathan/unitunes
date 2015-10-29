'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var midiaCtrlStub = {
  index: 'midiaCtrl.index',
  show: 'midiaCtrl.show',
  create: 'midiaCtrl.create',
  update: 'midiaCtrl.update',
  destroy: 'midiaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var midiaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './midia.controller': midiaCtrlStub
});

describe('midia API Router:', function() {

  it('should return an express router instance', function() {
    midiaIndex.should.equal(routerStub);
  });

  describe('GET /api/midias', function() {

    it('should route to midia.controller.index', function() {
      routerStub.get
        .withArgs('/', 'midiaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/midias/:id', function() {

    it('should route to midia.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'midiaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/midias', function() {

    it('should route to midia.controller.create', function() {
      routerStub.post
        .withArgs('/', 'midiaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/midias/:id', function() {

    it('should route to midia.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'midiaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/midias/:id', function() {

    it('should route to midia.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'midiaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/midias/:id', function() {

    it('should route to midia.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'midiaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
