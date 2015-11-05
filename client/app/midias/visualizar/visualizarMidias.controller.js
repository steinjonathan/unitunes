'use strict';

angular.module('unitunesApp')
  .controller('VisualizarMidiaCtrl', function($scope, $http, Auth, Midia, $location,$state) {

    // Use the User $resource to fetch all midias
    $scope.midias = Midia.query();

    $scope.obter = function(midia) {
      var a = Midia.get({ id: midia._id });
      $state.go('editarmidias');
    };

    $scope.excluir = function(midia) {
      Midia.remove({ id: midia._id });
      $scope.midias.splice(this.$index, 1);
    };
  });
