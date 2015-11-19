'use strict';

angular.module('unitunesApp')
  .controller('MidiasCtrl', function($scope, $window, Midia) {
    $scope.midias = Midia.query();

    $scope.deleteMidia = function(midia) {
      bootbox.confirm('Confirma exclusão?', (result) => {
        if(!result) return false;
        midia.$delete(function() {
          $scope.midias = $scope.midias.filter(function(el) {
            return el._id !== midia._id;
          });
        });
      });
    };
  });
