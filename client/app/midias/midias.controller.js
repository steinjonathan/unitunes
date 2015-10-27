'use strict';

angular.module('unitunesApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('midias', {
        url: '/midias',
        templateUrl: 'app/midias/visualizar/VisualizarMidias.html',
        controller: 'VisualizarMidiaCtrl'
      });
  })
  .run(function($rootScope) {
    
  });
