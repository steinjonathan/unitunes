'use strict';

angular.module('unitunesApp')
  .controller('AlbumNewCtrl', function($scope, $state,
    $stateParams, $http, Midia, Album, User, Upload, $timeout) {
  $scope.album = new Album();

  Midia.query(function(midias) {
    console.log(midias);
    $scope.midias = midias;
  });

  $scope.addAlbum = function() {
    $scope.album.$save(function() {
      console.log('midia', $scope.album);
      $state.go('albuns');
    });
  };
})
