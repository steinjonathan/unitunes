'use strict';

angular.module('unitunesApp')
  .controller('AlbumEditCtrl', function($scope, $state, $stateParams, $http, Album, Midia, User) {
  $scope.album = Album.get({ id: $stateParams.id }, function(album) {
    $scope.selectedMidias = album.midias;
  });
  Midia.query(function(midias) {
    console.log(midias);
    $scope.midias = midias;
  });

  $scope.updateAlbum = function() {
    console.log($scope.selectedMidias);
    console.log($scope.album);
    $scope.album.$update(function() {
      $state.go('albuns');
    });
  };
})
