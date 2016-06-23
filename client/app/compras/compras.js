'use strict';

angular.module('unitunesApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('compras', {
        url: '/compras',
        templateUrl: 'app/compras/compras.html',
        controller: 'ComprasCtrl',
        authenticate: true
      })
  });
