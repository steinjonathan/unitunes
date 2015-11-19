/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/midias              ->  index
 * POST    /api/midias              ->  create
 * GET     /api/midias/:id          ->  show
 * PUT     /api/midias/:id          ->  update
 * DELETE  /api/midias/:id          ->  destroy
 */

 'use strict';

 var _ = require('lodash');
 var Midia = require('./midia.model');

 // Get list of midias
 exports.index = function(req, res) {
   Midia
   .find(function (err, midias) {
     if(err) { return handleError(res, err); }
     return res.json(200, midias);
   })
   .populate('autores');
 };

 // Get a single midia
 exports.show = function(req, res) {
   Midia
   .findById(req.params.id, function (err, midia) {
     if(err) { return handleError(res, err); }
     if(!midia) { return res.send(404); }
     return res.json(midia);
   })
   .populate('autores');
 };

 // Creates a new midia in the DB.
 exports.create = function(req, res) {
   Midia.create(req.body, function(err, midia) {
     if(err) { return handleError(res, err); }
     return res.json(201, midia);
   });
 };

 // Updates an existing midia in the DB.
 exports.update = function(req, res) {
   if(req.body._id) { delete req.body._id; }
   Midia.findById(req.params.id, function (err, midia) {
     if (err) { return handleError(res, err); }
     if(!midia) { return res.send(404); }
     var updated = _.merge(midia, req.body);
     updated.save(function (err) {
       if (err) { return handleError(res, err); }
       return res.json(200, midia);
     });
   });
 };

 // Deletes a midia from the DB.
 exports.destroy = function(req, res) {
   Midia.findById(req.params.id, function (err, midia) {
     if(err) { return handleError(res, err); }
     if(!midia) { return res.send(404); }
     midia.remove(function(err) {
       if(err) { return handleError(res, err); }
       return res.send(204);
     });
   });
 };

 function handleError(res, err) {
   console.log(err);
   return res.send(500, err);
 }
