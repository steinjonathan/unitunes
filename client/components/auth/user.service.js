'use strict';

angular.module('unitunesApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      creditMoney: {
        method: 'PUT',
        params: {
          id:'me',
          controller: 'credit'
        }
      },
      buyMidia: {
        method: 'PUT',
        params: {
          id:'me',
          controller: 'buyMidia'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
    });
  });
