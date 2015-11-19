'use strict';

angular.module('unitunesApp')
  .controller('MidiaBuyCtrl', function($scope, $state,
    $stateParams, Midia, User, Upload, $timeout) {

  $scope.midia = Midia.get({ id: $stateParams.id });

  $scope.buyMidia = function() {
    
    User.get({ id: $scope.getCurrentUser()._id }, function(user) {
      user.comprada = $scope.midia;
      user.$buyMidia({}, function() {
        Auth.updateCurrentUser();
      });
    })

    // Account created, redirect to home
    $state.go('main');

  };
})
