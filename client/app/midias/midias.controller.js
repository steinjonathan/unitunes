'use strict';

angular.module('unitunesApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('midias', {
        url: '/midias',
        templateUrl: 'app/midias/visualizar/VisualizarMidias.html',
        controller: 'VisualizarMidiaCtrl'
      })
      .state('adicionarmidias', {
        url: '/addMidia',
        templateUrl: 'app/midias/adicionar/adicionarMidias.html',
        controller: 'AdicionarMidiaCtrl'
      });
  })
  .run(function($rootScope) {
    
  });
