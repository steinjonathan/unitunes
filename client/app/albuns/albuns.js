'use strict';

angular.module('unitunesApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('albuns', {
        url: '/albuns',
        templateUrl: 'app/albuns/albuns.html',
        controller: 'AlbunsCtrl',
        authenticate: true
      });
  })
