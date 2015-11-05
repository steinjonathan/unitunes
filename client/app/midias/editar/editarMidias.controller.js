'use strict';

angular.module('unitunesApp')
  .controller('EditarMidiaCtrl', function($state, ManterMidia, Midia, $scope) {
          
    var id = $state.params.id;
        
    $scope.midia = Midia.get({id:id});

    $scope.persistir = function(form, id) {
      $scope.submitted = true;

      if (form.$valid) {
        ManterMidia.updateMidia(
          $scope.midia
        )
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

    this.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

  });
