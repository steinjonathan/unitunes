'use strict';

angular.module('unitunesApp')
  .controller('AdicionarMidiaCtrl', function($scope, ManterMidia, $state) {
    $scope.midia = {};
    $scope.errors = {};

    $scope.adicionar = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        ManterMidia.createMidia({
          nome: $scope.midia.nome
        })
        .then(function() {
          // Account created, redirect to home
          $state.go('midias');
        })
        .catch(function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

  });
