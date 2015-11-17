'use strict';

angular.module('unitunesApp')
  .controller('MidiasCtrl', function($scope, $window, Midia) {
    $scope.midias = Midia.query();

    $scope.deleteMidia = function(midia) {
    if (confirm('Confirma exclusão?')) {
      midia.$delete(function() {
        $scope.midias = $scope.midias.filter(function(el) {
          return el._id !== midia._id;
        });
      });
    }
  };
  });
