/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/albums              ->  index
 * POST    /api/albums              ->  create
 * GET     /api/albums/:id          ->  show
 * PUT     /api/albums/:id          ->  update
 * DELETE  /api/albums/:id          ->  destroy
 */

 'use strict';

 var _ = require('lodash');
 var Compra = require('./compra.model');

 // Get list of albums
 exports.index = function(req, res) {
   Compra
   .find(function (err, albums) {
     if(err) { return handleError(res, err); }
     return res.json(200, albums);
   })
   .populate('midia')
   .populate('user');
 };

 // Get a single album
 exports.show = function(req, res) {
   Compra
   .findById(req.params.id, function (err, album) {
     if(err) { return handleError(res, err); }
     if(!album) { return res.send(404); }
     return res.json(album);
   })
   .populate('midias');
 };

 // Creates a new album in the DB.
 exports.create = function(req, res) {
   Compra.create(req.body, function(err, album) {
     if(err) { return handleError(res, err); }
     return res.json(201, album);
   });
 };

 // Updates an existing album in the DB.
 exports.update = function(req, res) {
   if(req.body._id) { delete req.body._id; }
   Compra.findById(req.params.id, function (err, album) {
     if (err) { return handleError(res, err); }
     if(!album) { return res.send(404); }
     var updated = _.merge(album, req.body);
     updated.save(function (err) {
       if (err) { return handleError(res, err); }
       return res.json(200, album);
     });
   });
 };

 // Deletes a album from the DB.
 exports.destroy = function(req, res) {
   Compra.findById(req.params.id, function (err, album) {
     if(err) { return handleError(res, err); }
     if(!album) { return res.send(404); }
     album.remove(function(err) {
       if(err) { return handleError(res, err); }
       return res.send(204);
     });
   });
 };

 function handleError(res, err) {
   console.log(err);
   return res.send(500, err);
 }
