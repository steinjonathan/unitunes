'use strict';

angular.module('unitunesApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('midias', {
        url: '/midias',
        templateUrl: 'app/midias/midias.html',
        controller: 'MidiasCtrl',
        authenticate: true
      })
      .state('newMidia', {
        url: '/midias/new',
        templateUrl: 'app/midias/midias.new.html',
        controller: 'MidiaNewCtrl'
      })
      .state('editMidia', {
        url: '/midias/:id/edit',
        templateUrl: 'app/midias/midias.edit.html',
        controller: 'MidiaEditCtrl'
      });
  });
