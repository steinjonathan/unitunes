'use strict';

angular.module('unitunesApp')
  .controller('CreditCtrl', function($scope, $http, User, Auth) {
  	$scope.errors = {};

    $scope.creditMoney = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.creditMoney($scope.user.saldo, $scope.user.valorACreditar)
          .then(function() {
            $scope.message = 'Saldo creditado com sucesso.';
          })
          .catch(function() {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Erro ao creditar.';
            $scope.message = '';
          });
      }
    };
  });
