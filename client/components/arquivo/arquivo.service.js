'use strict';

angular.module('unitunesApp')
  .factory('Arquivo', function ($resource) {
    return $resource('/api/arquivo/:id/:controller', { id: '@_id' },
    {
      update: {
        method: 'PUT'
      }
    });
  });
