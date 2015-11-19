'use strict';

angular.module('unitunesApp')
  .controller('LoginCtrl', function($scope, Auth, $state) {
    $scope.user = {
      email: 'test@example.com',
      password: 'test'
    };
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          // Logged in, redirect to home
          $state.go('main');
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
