'use strict';

angular.module('unitunesApp')
  .controller('MidiaNewCtrl', function($scope, $state, $stateParams, Midia) {
  $scope.midia = new Midia();

  $scope.addMidia = function() {
    $scope.midia.$save(function() {
      $state.go('midias');
    });
  };
})
