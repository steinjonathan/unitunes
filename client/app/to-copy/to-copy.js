'use strict';

angular.module('unitunesApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('to-copy', {
        url: '/to-copy',
        templateUrl: 'app/to-copy/to-copy.html',
        controller: 'ToCopyCtrl'
      });
  })
