'use strict';

angular.module('unitunesApp')
  .controller('CreditCtrl', function($scope, $http, $state, User, Auth) {
  	$scope.errors = {};
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.formasPagamento = ['Boleto', 'Cartão de crédito'];

    $scope.creditMoney = function(form) {

      bootbox.confirm('Creditar R$' + $scope.valor + ' com pagamento por ' + $scope.formaPgto + '. \n\nConfirma operação?', function(result) {
        if(!result) return;
        // TODO: MELHORAR
        User.get({ id: $scope.getCurrentUser()._id }, function(user) {
          user.valor = $scope.valor;
          user.$creditMoney({}, function() {
            Auth.updateCurrentUser();
          });
        })

        bootbox.alert("Seu crédito foi inserido!", function() {
          $state.go('main');
        });
      });
    };
  });
