'use strict';

angular.module('unitunesApp')
  .factory('Album', function ($resource) {
    return $resource('/api/album/:id/:controller', { id: '@_id' },
    {
      update: {
        method: 'PUT'
      }
    });
  });
