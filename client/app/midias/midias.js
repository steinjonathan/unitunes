'use strict';

angular.module('unitunesApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('midias', {
        url: '/midias',
        templateUrl: 'app/midias/midias.html',
        controller: 'MidiasCtrl',
        authenticate: true
      });
  })
