'use strict';

angular.module('unitunesApp')
  .controller('CreditCtrl', function($scope, $http, $state, User, Auth) {
  	$scope.errors = {};
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.creditMoney = function(form) {
      // TODO: MELHORAR
      console.log('test', User.$creditMoney);
      User.get({ id: $scope.getCurrentUser()._id }, function(user) {
        user.valor = $scope.valor;
        user.$creditMoney({}, function() {
          Auth.updateCurrentUser();
        });
      });
    };
  });
