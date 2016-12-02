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
 var Arquivo = require('./arquivo.model');

 // Creates a new midia in the DB.
 exports.create = function(req, res) {
   Arquivo.create(req.body, function(err, arquivo) {
     if(err) { return handleError(res, err); }
     return res.json(201, arquivo);
   });
 };

 exports.show = function(req, res) {
   Arquivo
   .findById(req.params.id, function (err, arquivo) {
     if(err) { return handleError(res, err); }
     if(!arquivo) { return res.send(404); }
     console.log('asdasdasdasdasDASDASDASdasDASDASD',__dirname,  arquivo);
     return res.download(__dirname + '/../../../client/assets/images/' + arquivo.path);
   })
   .populate('autores');
 };

 function handleError(res, err) {
   console.log(err);
   return res.send(500, err);
 }
