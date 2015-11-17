'use strict';

angular.module('unitunesApp')
  .controller('SettingsCtrl', function($scope, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(function() {
            $scope.message = 'Senha alterada com sucesso.';
          })
          .catch(function() {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Senha Incorreta';
            $scope.message = '';
          });
      }
    };
  });
