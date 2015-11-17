'use strict';

angular.module('unitunesApp')
  .controller('MidiaEditCtrl', function($scope, $state, $stateParams, Midia) {
  $scope.midia = Midia.get({ id: $stateParams.id });

  $scope.updateMidia = function() {
    $scope.midia.$update(function() {
      $state.go('midias');
    });
  };
})
