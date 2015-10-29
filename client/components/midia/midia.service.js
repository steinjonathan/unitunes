'use strict';

angular.module('unitunesApp')
  .factory('Midia', function ($resource) {
    return $resource('/api/midias/:id/:controller', {
      id: '@_id'
    });
  });