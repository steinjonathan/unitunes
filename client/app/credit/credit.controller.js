'use strict';

angular.module('unitunesApp')
  .controller('CreditCtrl', function($scope, $http, $state, User, Auth) {
  	$scope.errors = {};
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.formasPagamento = ['Boleto', 'Cartão de crédito'];

    $scope.creditMoney = function(form) {

      if (confirm('Creditar R$' + $scope.valor + ' com pagamento por ' + $scope.formaPgto + '. \n\nConfirma operação?')) {
        // TODO: MELHORAR
        console.log('test', User.$creditMoney);
        User.get({ id: $scope.getCurrentUser()._id }, function(user) {
          user.valor = $scope.valor;
          user.$creditMoney({}, function() {
            Auth.updateCurrentUser();
          });
        })

        // Account created, redirect to home
        $state.go('main');
      
      } else {

      }
    };
  });
