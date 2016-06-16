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

 function handleError(res, err) {
   console.log(err);
   return res.send(500, err);
 }
