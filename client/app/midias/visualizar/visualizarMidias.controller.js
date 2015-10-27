'use strict';

angular.module('unitunesApp')
  .controller('VisualizarMidiaCtrl', function($scope, $http, Auth, Midia) {

    // Use the User $resource to fetch all users
    $scope.midias = Midia.query();

    $scope.obter = function(midia) {
      Midia.get({ id: midia._id });
    };
  });
