'use strict';

angular.module('unitunesApp')
  .factory('Midia', function ($resource) {
    return $resource('/api/midia/:id/:controller', { id: '@_id' },
    {
      update: {
        method: 'PUT'
      }
    });
  });
