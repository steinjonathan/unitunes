'use strict';

angular.module('unitunesApp')
  .factory('Compra', function ($resource) {
    return $resource('/api/compra/:id/:controller', { id: '@_id' },
    {
      update: {
        method: 'PUT'
      }
    });
  });
