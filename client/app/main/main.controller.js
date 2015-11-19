'use strict';
(function() {

function MainController($scope, $http, Midia, Auth, User) {
  $scope.filtros = {
    ativo: true
  };

  $scope.isPlaying = false;

  Midia
    .query(function(midias) {
      midias = midias.map(function(m) {
        m.autores = m.autores.map(function(a) {
          return a.name
        }).join(',');
        return m;
      });

      $scope.midiasRawData = midias;
      $scope.midias = midias;
      $scope.filtrarByTipo(false);
    });

  $scope.filtrarByTipo = function(tipo) {
    $scope.midias = $scope.midiasRawData;

    if(tipo === false) {
      delete $scope.filtros.tipo;
      return;
    }

    $scope.midias = $scope.midias
      .filter(function(m) {
        return m.tipo === tipo;
      });
    $scope.filtros.tipo = tipo;
  };

  $scope.playMidia = function(midia) {
    $scope.isPlaying = true;
    $scope.midiaSelected = midia;
  };

  $scope.comprarMidia = function(midia) {
    if(confirm('Deseja realmente comprar esta mídia por R$ '+midia.preco+'?')) {
      var currentUser = Auth.getCurrentUser();
      if(currentUser.saldo > midia.preco) {
        User.addMidia({midia: midia}, function() {
          Auth.updateCurrentUser();
        });
      } else {
        alert('Saldo insuficiente!');
        return false;
      }
    }
  };
}

angular.module('unitunesApp')
  .controller('MainController', MainController);

})();
